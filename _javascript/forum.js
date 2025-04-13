const tabelaTopicos = document.querySelector('#topicos_tabela tbody');          // da tabela de tópicos — onde vamos injetar as linhas.
const botaoPerguntar = document.getElementById('botao_perguntar');              // da tabela de tópicos — onde vamos injetar as linhas.zzz
const formularioPerguntar  = document.getElementById('formulario_perguntar');   // formulário de nova pergunta — inicialmente oculto.
const botaoCancelar = document.getElementById('botao_cancelar');                // botão “Cancelar” dentro do form, para fechá‑lo.

// 2) Função para carregar tópicos + contagem de respostas
async function loadTopics() {
  const { data: perguntas, error } = await supabase
    .from('perguntas_com_respostas')                              // acessa a view no banco.
    .select('*')                                                  // seleciona todas as colunas disponíveis na view (id_perguntas, titulo, criado_em, total_respostas).
    .order('criado_em', { ascending: false });                    // ordena os resultados do mais recente para o mais antigo (descendente).
  /*
    O resultado vem como um objeto com dois campos:
    data → os dados da consulta (renomeado aqui para perguntas)
    error → erro, se houver algum
  */

  // Se houver algum erro na consulta, mostra no console e interrompe a função.
  // Isso evita que o restante do código tente renderizar dados inexistentes (undefined).
  if (error) {
    console.error(error);
    return;
  }


  // Inicia um laço (for...of) que percorre cada pergunta recebida do Supabase.
  for (const p of perguntas) {                                 // Cada item p representa uma pergunta individual, com seus campos vindos da view.
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a href="pergunta.html?id=${p.id_perguntas}">${p.titulo}</a></td>
      <td style="text-align:center;">${p.total_respostas}</td>
    `; // Define o conteúdo dessa linha:
    tabelaTopicos.appendChild(tr); // Por fim, adiciona essa nova linha à tabela na tela (tabelaTopicos, que deve ser o <tbody> da tabela de tópicos).
  }
}

// 3) Verifica autenticação para exibir botão “Faça uma pergunta”
supabase.auth.onAuthStateChange((event, session) => {          // registra um callback que é chamado sempre que o usuário faz login ou logout.
  if (session && session.user) {                               // Se existir session.user, mostramos o botão de perguntar. Caso contrário, ocultamos o botão e também o formulário (caso estivesse aberto).
    botaoPerguntar.style.display = 'block';
  } else {
    botaoPerguntar.style.display = 'none';
    formularioPerguntar.style.display = 'none';
  }
});

// 4) Exibe formulário ao clicar no botão
botaoPerguntar.addEventListener('click', () => {                // Exibe o <form> (formularioPerguntar) e esconde o botão para evitar múltiplos cliques.
  formularioPerguntar.style.display = 'block';
  botaoPerguntar.style.display = 'none';
});

// 4.1) Fecha o formulário ao clicar no botão “Cancelar”
botaoCancelar.addEventListener('click', () => {                 // Fecha o form e volta a exibir o botão.
  document.getElementById('titulo_pergunta').value = '';        // Limpa o campo de título.
  document.getElementById('conteudo_pergunta').value = '';      // Limpa o campo de conteúdo.
  formularioPerguntar.style.display = 'none';
  botaoPerguntar.style.display = 'block';
});

// 5) Envia o formulário
formularioPerguntar.addEventListener('submit', async (e) => {
  e.preventDefault();                                          // evita que o navegador faça reload.
  const formData = new FormData(formularioPerguntar);          // facilita leitura de todos os campos do form.
  const titulo = formData.get('title');
  const conteudo = formData.get('body');
  const files = formData.getAll('files');

  const { data: { user } } = await supabase.auth.getUser();    // Verifica se o usuário está logado
  if (!user) {
    alert('Faça login para postar.');
    return;
  }

  let media_url = null;
  let media_tipo = null;

  // 5.1) Faz upload dos arquivos para o Storage
  // Se houver arquivo, faz upload do primeiro
  if (files.length > 0 && files[0].size > 0) {
    const file = files[0];
    const path = `perguntas/${crypto.randomUUID()}_${file.name}`;

    const { error: upErr } = await supabase
      .storage
      .from('uploads')
      .upload(path, file);

    if (upErr) {
      console.error('Erro no upload:', upErr);
    } else {
      const { data: urlData } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(path);

      media_url = urlData.publicUrl;
      media_tipo = file.type;

      console.log('Arquivo enviado com sucesso:', media_url);
      console.log('Tipo do arquivo:', media_tipo);

    }
  } else {
    console.log('Nenhum arquivo enviado.');
  }

  // 5.2) Cria a pergunta
  const { data: pergunta, error: qErr } = await supabase
    .from('perguntas')
    .insert({                  // insere um novo registro em questions.
      titulo,
      conteudo,
      id_autor: user.id,       // Passa author_id como o id do usuário logado.
      media_url,
      media_tipo
    })
    .select('id_perguntas')    // pede de volta apenas o id da nova pergunta, para usarmos nos uploads.
    .single();

  if (qErr) {
    console.error(qErr);
    return;
  }

  // 5.3) Limpa e recarrega
  formularioPerguntar.reset();                  // limpa todos os campos do formulário.     
  formularioPerguntar.style.display = 'none';   // Oculta novamente o form.
  tabelaTopicos.innerHTML = " ";                // Limpa a tabela de tópicos (tabelaTopicos) para evitar duplicação de perguntas.
  loadTopics();                                 // Chama loadTopics() para atualizar a lista de perguntas na tela, já incluindo a nova.

  window.location.href = `pergunta.html?id=${pergunta.id_perguntas}`; // Redireciona para a página da pergunta recém-criada, usando o id retornado na inserção.
});

// 6) Carrega tudo ao abrir a página
window.addEventListener('DOMContentLoaded', loadTopics);
// Quando o DOM estiver pronto, executa loadTopics() para popular a tabela de tópicos mesmo antes de qualquer interação.