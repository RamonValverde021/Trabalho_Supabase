const tableBody = document.querySelector('#topics-table tbody'); // da tabela de tópicos — onde vamos injetar as linhas.
const askButton = document.getElementById('ask-button');         // da tabela de tópicos — onde vamos injetar as linhas.zzz
const askForm = document.getElementById('ask-form');             // formulário de nova pergunta — inicialmente oculto.
const cancelForm = document.getElementById('cancel-form');       // botão “Cancelar” dentro do form, para fechá‑lo.

// 2) Função para carregar tópicos + contagem de respostas
async function loadTopics() {
    // Busca todas as perguntas
    let { data: questions, error } = await supabase
        .from('questions')                          // escolhe a tabela.
        .select(`id, title,             
      answers:answers(count)`)                  // faz um join implícito na tabela answers, renomeando como answers e contando quantos registros existem (count).
        .order('created_at', { ascending: false }); // ordena da pergunta mais recente para a mais antiga.

    if (error) return console.error(error);       // se error existir, exibe no console e interrompe.

    // Renderização: limpa o <tbody> e, para cada pergunta, cria um <tr> com:
    // um link para a página de detalhes (pergunta.html?id=...) usando o id.
    // a quantidade de respostas (q.answers.count).
    tableBody.innerHTML = '';
    questions.forEach(q => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td><a href="pergunta.html?id=${q.id}">${q.title}</a></td>
      <td style="text-align:center;">${q.answers.count}</td> 
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
askButton.addEventListener('click', () => {  // Exibe o <form> (askForm) e esconde o botão para evitar múltiplos cliques.
    askForm.style.display = 'block';
    askButton.style.display = 'none';
});
cancelForm.addEventListener('click', () => { // Fecha o form e volta a exibir o botão.
    askForm.style.display = 'none';
    askButton.style.display = 'block';
});

// 5) Tratamento do envio do formulário
askForm.addEventListener('submit', async (e) => {
    e.preventDefault();                                //  evita que o navegador faça reload.
    const formData = new FormData(askForm);            // facilita leitura de todos os campos do form.
    const title = formData.get('title');
    const body = formData.get('body');
    const files = formData.getAll('files');

    const user = supabase.auth.getUser(); // Verifica se o usuário está logado
    if (!user) return alert('Faça login para postar.');

    // 5.1) Cria a pergunta
    let { data: question, error: qErr } = await supabase
        .from('questions')
        .insert({                                        // insere um novo registro em questions.
            title,
            body,
            author_id: (await user).data.user.id           // Passa author_id como o id do usuário logado.
        })
        .select('id')                                    // pede de volta apenas o id da nova pergunta, para usarmos nos uploads.
        .single();
    if (qErr) return console.error(qErr);

    // 5.2) Faz upload dos arquivos para o Storage (pasta `questions/{id}/`)
    if (files.length) {
        for (let file of files) {                                 // Itera sobre cada file selecionado.
            const path = `questions/${question.id}/${file.name}`;   // Define um caminho organizado
            let { error: upErr } = await supabase
                .storage
                .from('uploads')
                .upload(path, file);
            if (upErr) console.error('Upload:', upErr);             // para enviar ao bucket uploads.
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