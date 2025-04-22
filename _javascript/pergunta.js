// Referência aos elementos HTML - Armazena os elementos do HTML em variáveis para facilitar o uso depois.
const tituloPergunta = document.getElementById('titulo_pergunta');
const conteudoPergunta = document.getElementById('conteudo_pergunta');
const mediaPergunta = document.getElementById('media_pergunta');
const listaRespostas = document.getElementById('lista_respostas');
const formularioResposta = document.getElementById('formulario_resposta');
const loginMsg = document.getElementById('login_msg');
const feedbackResposta = document.getElementById('feedback_resposta');

const btnCurtir = document.getElementById('btn_curtir_pergunta');
const iconeCurtir = btnCurtir.querySelector('.icone');
const contadorCurtidas = document.getElementById('contador_curtidas');

// Variável global para manter o ID da pergunta
let idPerguntaGlobal = null;

// Quando a página é carregada:
window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idPergunta = params.get('id');  // Pega o id da pergunta direto da URL, tipo:
    if (idPergunta) {
        idPerguntaGlobal = idPergunta;    // Armazena o id para uso posterior
        await loadPergunta(idPergunta);   // Busca a pergunta
        await loadRespostas(idPergunta);  // Carrega as respostas
        await checkAuth();                // Verifica se o usuário está logado
    } else {                              // Se não tiver id, já dá erro e mostra mensagem no HTML.
        console.error('ID da pergunta não foi fornecido na URL.');
        tituloPergunta.textContent = 'ID da pergunta não encontrado.';
        throw new Error('ID da pergunta não encontrado na URL');
    }
});

// Busca no Supabase a pergunta com o id_perguntas da URL.
async function loadPergunta(idPergunta) {
    const { data, error } = await supabase
        .from('perguntas')
        .select('*')
        .eq('id_perguntas', idPergunta)
        .single();                       // // .single() garante que volte só 1 registro. - O método .single() retorna apenas um registro, já que o id é único.

    // Se encontrar, atualiza o HTML com título e conteudo da pergunta.
    if (error) {
        console.error('Erro ao carregar pergunta:', error);
        tituloPergunta.textContent = 'Erro ao carregar a pergunta.';
        return;
    }

    // Atualiza título e conteudo
    tituloPergunta.textContent = data.titulo;
    conteudoPergunta.textContent = data.conteudo;
    mediaPergunta.innerHTML = ''; // limpa conteúdo anterior, se houver

    // Exibe a mídia, se houver
    if (data.media_url && data.media_tipo) {
        if (data.media_tipo.startsWith('image/')) {
            mediaPergunta.innerHTML = `<img src="${data.media_url}" alt="imagem da pergunta" style="max-width: 100%; border-radius: 8px;">`;
        } else if (data.media_tipo.startsWith('video/')) {
            mediaPergunta.innerHTML = `
                <video controls style="max-width: 100%; border-radius: 8px;">
                <source src="${data.media_url}" type="${data.media_tipo}">
                Seu navegador não suporta vídeo.
                </video>
                `;
        } else if (data.media_tipo.startsWith('audio/')) {
            mediaPergunta.innerHTML = `
                <audio controls style="width: 100%;">
                <source src="${data.media_url}" type="${data.media_tipo}">
                Seu navegador não suporta áudio.
                </audio>
                `;
        } else {
            mediaPergunta.innerHTML = `
                <a href="${data.media_url}" download style="display:inline-block; margin-top:10px; color:blue;">
                    📥 Baixar arquivo
                </a>
                `;
        }
    }


    // Atualiza botão de curtida
    contadorCurtidas.textContent = data.curtidas;

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (user) {
        const { data: curtida, error: erroCurtida } = await supabase
            .from('curtidas_perguntas')
            .select('*')
            .eq('id_pergunta', idPergunta)
            .eq('id_usuario', user.id)
            .single();

        if (curtida) {
            iconeCurtir.textContent = '❤️';
            btnCurtir.classList.add('ativo');
        } else {
            iconeCurtir.textContent = '🤍';
            btnCurtir.classList.remove('ativo');
        }
    }

}


// Verifica autenticação
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();  // Pega o usuário logado no Supabase.

    // Se estiver logado, mostra o formulário de resposta. Se não estiver, mostra a mensagem pedindo login.
    if (user) {                                                // Verifica se há um usuário logado.
        formularioResposta.style.display = 'block';
        loginMsg.style.display = 'none';
    } else {
        formularioResposta.style.display = 'none';
        loginMsg.style.display = 'block';
    }
}

// Impede o envio padrão do formulário (reload).
formularioResposta.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Limpa o feedback da resposta anterior.
    feedbackResposta.textContent = '';

    // Lê o conteudo da resposta digitada e verifica se o usuário está logado.
    const conteudo = document.getElementById('conteudo_resposta').value.trim();
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) {
        feedbackResposta.textContent = 'Você precisa estar logado.';
        return;
    }

    // Insere no Supabase a nova resposta com:
    const { error } = await supabase
        .from('respostas')
        .insert([
            {
                id_perguntas: idPerguntaGlobal,  // ID da pergunta
                conteudo,                        // Conteudo digitado
                id_autor: user.id                // ID do autor
            }
        ]);

    // Se funcionar, mostra mensagem verde e atualiza a lista de respostas.
    if (error) {
        feedbackResposta.textContent = `Erro: ${error.message}`;
        feedbackResposta.style.color = 'red';
        return;
    }

    feedbackResposta.textContent = 'Resposta enviada com sucesso!';
    feedbackResposta.style.color = 'green';
    formularioResposta.reset();
    await loadRespostas(idPerguntaGlobal);
});


btnCurtir.addEventListener('click', async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if (!user) {
        alert('Você precisa estar logado para curtir.');
        return;
    }

    const { data: curtidaExistente } = await supabase
        .from('curtidas_perguntas')
        .select('*')
        .eq('id_pergunta', idPerguntaGlobal)
        .eq('id_usuario', user.id)
        .single();

    let novaContagem = parseInt(contadorCurtidas.textContent);

    if (curtidaExistente) {
        // Descurtir
        await supabase
            .from('curtidas_perguntas')
            .delete()
            .eq('id_pergunta', idPerguntaGlobal)
            .eq('id_usuario', user.id);

        novaContagem--;
        iconeCurtir.textContent = '🤍';
        btnCurtir.classList.remove('ativo');
    } else {
        // Curtir
        await supabase
            .from('curtidas_perguntas')
            .insert([{
                id_pergunta: idPerguntaGlobal,
                id_usuario: user.id
            }]);

        novaContagem++;
        iconeCurtir.textContent = '❤️';
        btnCurtir.classList.add('ativo');
    }

    // Atualiza contagem na tabela perguntas
    await supabase
        .from('perguntas')
        .update({ curtidas: novaContagem })
        .eq('id_perguntas', idPerguntaGlobal);

    contadorCurtidas.textContent = novaContagem;
});
