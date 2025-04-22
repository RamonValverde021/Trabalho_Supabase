// Referência aos elementos HTML - Armazena os elementos do HTML em variáveis para facilitar o uso depois.
const tituloPergunta = document.getElementById('titulo_pergunta');
const conteudoPergunta = document.getElementById('conteudo_pergunta');
const mediaPergunta = document.getElementById('media_pergunta');
const listaRespostas = document.getElementById('lista_respostas');
const formularioResposta = document.getElementById('formulario_resposta');
const loginMsg = document.getElementById('login_msg');
const feedbackResposta = document.getElementById('feedback_resposta');

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
        await atualizaDados(idPergunta);
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
}

// Busca no Supabase as respostas da pergunta com o id_perguntas da URL.
// Ordenadas da mais antiga para a mais nova.
async function loadRespostas(idPergunta) {
    const { data, error } = await supabase
        .from('respostas')
        .select('*')
        .eq('id_perguntas', idPergunta)
        .order('criado_em', { ascending: true });  // Ordena as respostas pela data de criação, do mais antigo para o mais novo.

    // Se der erro, mostra aviso. Se não houver respostas, mostra “Nenhuma resposta”. - Se encontrar, atualiza o HTML com as respostas.
    if (error) {
        listaRespostas.innerHTML = `<p style="color:red">Erro ao carregar respostas.</p>`;
        console.error(error);
        return;
    }

    // Se não houver respostas, mostra mensagem.
    if (!data.length) {
        listaRespostas.innerHTML = '<p>Nenhuma resposta ainda.</p>';
        return;
    }

    // Para cada resposta: 
    listaRespostas.innerHTML = '';
    data.forEach(r => {
        const div = document.createElement('div');  // Cria uma <div>
        //div.classList.add('resposta');              // Adiciona a classe resposta para estilizar depois.
        div.innerHTML = `

        <div id="painel_resposta" class="painel">
         <div id="dados_autor_resposta" class="dados_autor">
            <div class="autor_esquerda">
               <img src="../_images/Sem-perfil.png" id="perfil_autor_resposta" class="perfil_autor">
               <span id="nome_autor_resposta" class="nome_autor">Nome autor</span>
            </div>
            <span id="tempo_de_postagem_resposta" class="tempo_de_postagem">00</span>
         </div>
         <p id="conteudo_resposta" class="conteudo">${r.conteudo}</p>
         <small>Respondido em ${new Date(r.criado_em).toLocaleString()}</small>
   
         <div id="media_resposta" class="midia"></div>
         <div id="interacao_resposta" class="interacao">
            <span id="numero_respostas" class="numero_respostas">0 Respostas</span>
            <div class="interacao_direita">
               <button id="btn_responder_resposta" class="btn_responder">↩︎ Responder</button>
               <button id="btn_curtir_resposta" class="btn_curtir">🤍</button>
               <span id="contador_curtidas">0</span>
               <button id="btn_excluir_resposta" class="btn_excluir">✖️</button>
            </div>
         </div>
      </div>
      <hr>



    
      
      
      `; // Adiciona o conteudo da resposta e a data formatada - Adiciona o conteúdo da resposta na div.
        
      
      
      listaRespostas.appendChild(div);               // Insere no HTML a div criada com a resposta.
    });
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


const numeroRespostas = document.getElementById("numero_respostas");
const tempoPostagem = document.getElementById("tempo_de_postagem_pergunta");
const autorPergunta = document.getElementById("nome_autor_pergunta");
const categoriaPergunta = document.getElementById("categotia_pergunta");

async function atualizaDados(idPergunta) {
    const { data, error } = await supabase
        .from('perguntas_com_respostas')
        .select('*')
        .eq('id_perguntas', idPergunta);

    if (error) {
        console.error(error);
        return;
    }
    numeroRespostas.innerText = `${data[0].total_respostas} Respostas `;
    tempoPostagem.innerText =  `${formatarTempoDecorrido(data[0].criado_em)}`;
    autorPergunta.innerText = data[0].nome_autor;
    categoriaPergunta.innerText = `🔹 ${data[0].categoria}`;
}


// Formatação do tempo decorrido desde que a pergunta foi criada
function formatarTempoDecorrido(dataCriadoEm) {
    const agora = new Date();
    const criado = new Date(dataCriadoEm);
    const diffMs = agora - criado;
  
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffDias < 1) { // Se for menos de 1 dia, mostra horas e minutos
      if (diffHoras < 1) {
        if (diffMinutos < 1) {
          return 'Agora Mesmo!';
        } else {
          return `${diffMinutos} m`;
        }
      } else {
        return `${diffHoras} h`;
      }
    } else {
      return `${diffDias} d`;
    }
  }