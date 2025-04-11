const tableBody = document.querySelector('#topics-table tbody'); // da tabela de tópicos — onde vamos injetar as linhas.
const askButton = document.getElementById('ask-button');         // da tabela de tópicos — onde vamos injetar as linhas.zzz
const askForm = document.getElementById('ask-form');             // formulário de nova pergunta — inicialmente oculto.
const cancelForm = document.getElementById('cancel-form');       // botão “Cancelar” dentro do form, para fechá‑lo.

// 2) Função para carregar tópicos + contagem de respostas
async function loadTopics() {
  // Busca todas as perguntas
  const { data: perguntas, error } = await supabase
    .from('perguntas')                          // escolhe a tabela.
    .select(`id_perguntas, titulo, 
             respostas:respostas(count)`)       // faz um join implícito na tabela answers, renomeando como answers e contando quantos registros existem (count).
    .order('criado_em', { ascending: false });  // ordena da pergunta mais recente para a mais antiga.

  if (error) {
    console.error(error); // se error existir, exibe no console e interrompe.
    return;
  }

  // Renderização: limpa o <tbody> e, para cada pergunta, cria um <tr> com:
  // um link para a página de detalhes (pergunta.html?id=...) usando o id.
  // a quantidade de respostas (q.answers.count).
  tableBody.innerHTML = '';
  perguntas.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a href="pergunta.html?id=${p.id_perguntas}">${p.titulo}</a></td>
      <td style="text-align:center;">${p.respostas.count}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// 3) Verifica autenticação para exibir botão “Faça uma pergunta”
supabase.auth.onAuthStateChange((event, session) => {  // registra um callback que é chamado sempre que o usuário faz login ou logout.
  if (session && session.user) {                       // Se existir session.user, mostramos o botão de perguntar. Caso contrário, ocultamos o botão e também o formulário (caso estivesse aberto).
    askButton.style.display = 'block';
  } else {
    askButton.style.display = 'none';
    askForm.style.display = 'none';
  }
});

// 4) Exibe formulário ao clicar no botão
askButton.addEventListener('click', () => {   // Exibe o <form> (askForm) e esconde o botão para evitar múltiplos cliques.
  askForm.style.display = 'block';
  askButton.style.display = 'none';
});
cancelForm.addEventListener('click', () => {  // Fecha o form e volta a exibir o botão.
  askForm.style.display = 'none';
  askButton.style.display = 'block';
});

// 5) Tratamento do envio do formulário
askForm.addEventListener('submit', async (e) => {
  e.preventDefault();                              // evita que o navegador faça reload.
  const formData = new FormData(askForm);          // facilita leitura de todos os campos do form.
  const titulo = formData.get('title');
  const texto = formData.get('body');
  const files = formData.getAll('files');

  const { data: { user } } = await supabase.auth.getUser();  // Verifica se o usuário está logado
  if (!user) {
    alert('Faça login para postar.');
    return;
  }

  // 5.1) Cria a pergunta
  const { data: pergunta, error: qErr } = await supabase
    .from('perguntas')
    .insert({                  // insere um novo registro em questions.
      titulo,
      texto,
      id_autor: user.id        // Passa author_id como o id do usuário logado.
    })
    .select('id_perguntas')    // pede de volta apenas o id da nova pergunta, para usarmos nos uploads.
    .single();
  if (qErr) {
    console.error(qErr);
    return;
  }

  // 5.2) Faz upload dos arquivos para o Storage
  if (files.length) {
    for (let file of files) {                                          // Itera sobre cada file selecionado.
      const path = `perguntas/${pergunta.id_perguntas}/${file.name}`;  // Define um caminho organizado
      const { error: upErr } = await supabase
        .storage
        .from('uploads')
        .upload(path, file);
      if (upErr) console.error('Upload:', upErr);
    }
  }

  // 5.3) Limpa e recarrega
  askForm.reset();                  // limpa todos os campos do formulário.
  askForm.style.display = 'none';   // Oculta novamente o form.
  loadTopics();                     // Chama loadTopics() para atualizar a lista de perguntas na tela, já incluindo a nova.
});

// 6) Carrega tudo ao abrir a página
window.addEventListener('DOMContentLoaded', loadTopics);
// Quando o DOM estiver pronto, executa loadTopics() para popular a tabela de tópicos mesmo antes de qualquer interação.