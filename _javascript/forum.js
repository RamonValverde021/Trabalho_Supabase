const tableBody = document.querySelector('#topics-table tbody'); // da tabela de tópicos — onde vamos injetar as linhas.
const askButton = document.getElementById('ask-button');         // da tabela de tópicos — onde vamos injetar as linhas.zzz
const askForm = document.getElementById('ask-form');             // formulário de nova pergunta — inicialmente oculto.
const cancelForm = document.getElementById('cancel-form');       // botão “Cancelar” dentro do form, para fechá‑lo.

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
    const tr = document.createElement('tr');                   // Cria um novo elemento HTML <tr> (linha de tabela) para exibir a pergunta.
    tr.innerHTML = `
      <td><a href="pergunta.html?id=${p.id_perguntas}">${p.titulo}</a></td>
      <td style="text-align:center;">${p.total_respostas}</td>
    `; // Define o conteúdo dessa linha:
    tableBody.appendChild(tr); // Por fim, adiciona essa nova linha à tabela na tela (tableBody, que deve ser o <tbody> da tabela de tópicos).
  }
}

// 3) Verifica autenticação para exibir botão “Faça uma pergunta”
supabase.auth.onAuthStateChange((event, session) => {          // registra um callback que é chamado sempre que o usuário faz login ou logout.
  if (session && session.user) {                               // Se existir session.user, mostramos o botão de perguntar. Caso contrário, ocultamos o botão e também o formulário (caso estivesse aberto).
    askButton.style.display = 'block';
  } else {
    askButton.style.display = 'none';
    askForm.style.display = 'none';
  }
});

// 4) Exibe formulário ao clicar no botão
askButton.addEventListener('click', () => {                    // Exibe o <form> (askForm) e esconde o botão para evitar múltiplos cliques.
  askForm.style.display = 'block';
  askButton.style.display = 'none';
});
cancelForm.addEventListener('click', () => {                   // Fecha o form e volta a exibir o botão.
  askForm.style.display = 'none';
  askButton.style.display = 'block';
});

// 5) Tratamento do envio do formulário
askForm.addEventListener('submit', async (e) => {
  e.preventDefault();                                          // evita que o navegador faça reload.
  const formData = new FormData(askForm);                      // facilita leitura de todos os campos do form.
  const titulo = formData.get('title');
  const texto = formData.get('body');
  const files = formData.getAll('files');

  const { data: { user } } = await supabase.auth.getUser();    // Verifica se o usuário está logado
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