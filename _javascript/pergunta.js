const tituloEl = document.getElementById('titulo-pergunta')
const textoEl = document.getElementById('texto-pergunta')
const respostasEl = document.getElementById('lista-respostas')
const formResposta = document.getElementById('form-resposta')
const loginMsg = document.getElementById('login-msg')
const feedbackResposta = document.getElementById('feedback-resposta')

const params = new URLSearchParams(window.location.search)
const idPergunta = params.get('id')
if (!idPergunta) {
  tituloEl.textContent = 'Pergunta não especificada.'
  throw new Error('ID da pergunta não encontrado na URL')
}

async function loadPergunta() {
  const { data, error } = await supabase
    .from('perguntas')
    .select('*')
    .eq('id_perguntas', idPergunta)
    .single()

  if (error || !data) {
    tituloEl.textContent = 'Erro ao carregar a pergunta.'
    console.error(error)
    return
  }
  tituloEl.textContent = data.titulo
  textoEl.textContent = data.texto
}

async function loadRespostas() {
  const { data, error } = await supabase
    .from('respostas')
    .select('*')
    .eq('id_perguntas', idPergunta)
    .order('criado_em', { ascending: true })

  if (error) {
    respostasEl.innerHTML = `<p style="color:red">Erro ao carregar respostas.</p>`
    console.error(error)
    return
  }

  if (!data.length) {
    respostasEl.innerHTML = '<p>Nenhuma resposta ainda.</p>'
    return
  }

  respostasEl.innerHTML = ''
  data.forEach(r => {
    const div = document.createElement('div')
    div.classList.add('resposta')
    div.innerHTML = `
      <p>${r.texto}</p>
      <small>Respondido em ${new Date(r.criado_em).toLocaleString()}</small>
    `
    respostasEl.appendChild(div)
  })
}

async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    formResposta.style.display = 'block'
    loginMsg.style.display = 'none'
  } else {
    formResposta.style.display = 'none'
    loginMsg.style.display = 'block'
  }
}

formResposta.addEventListener('submit', async (e) => {
  e.preventDefault()
  feedbackResposta.textContent = ''
  const texto = document.getElementById('resposta').value.trim()

  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user

  if (!user) {
    feedbackResposta.textContent = 'Você precisa estar logado.'
    return
  }

  const { data, error } = await supabase
    .from('respostas')
    .insert([
      {
        id_perguntas: idPergunta,
        texto,
        id_autor: user.id
      }
    ])

  if (error) {
    feedbackResposta.textContent = `Erro: ${error.message}`
    feedbackResposta.style.color = 'red'
    return
  }

  feedbackResposta.textContent = 'Resposta enviada com sucesso!'
  feedbackResposta.style.color = 'green'
  formResposta.reset()
  loadRespostas()
})

window.addEventListener('DOMContentLoaded', async () => {
  await loadPergunta()
  await loadRespostas()
  await checkAuth()
})