// Variaveis de inicialização do Supabase
const supabaseUrl = "https://yfslzbsaazkvofzjbkyk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmc2x6YnNhYXprdm9mempia3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDk1OTMsImV4cCI6MjA1OTA4NTU5M30.jlxk0LcLeuF60iV540i0eHHCrf43MIYXTTSKfTOCM-s";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Checa se o usuário está logado quando a página carrega
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        mostrarMenuConta(user);
        atualizarFotoPerfilMenu();
    } else {
        mostrarMenuLogin();
    }
});

// Função para controle de menu de login e conta
function mostrarMenuLogin() {
    document.getElementById('page_login').classList.add('menu_visible');
    document.getElementById('page_minha_conta').classList.add('menu_hide');
}

// Teste para exibir dados do usuario logado
async function mostrarMenuConta(user) {
    document.getElementById('page_login').classList.add('menu_hide');
    document.getElementById('page_minha_conta').classList.add('menu_visible');

    if (user) {
        // Exibe os dados do usuário no console
        console.log(`Usuário logado: ${user.email}`);
        /*
        console.log(`
            ID: ${user.id} \n 
            Nome: ${user.user_metadata.nome} \n
            CPF: ${user.user_metadata.cpf} \n
            Nascimento: ${user.user_metadata.nascimento} \n
            Sexo: ${user.user_metadata.sexo} \n
            Estado civil: ${user.user_metadata.estado_civil} \n
            Celular: ${user.user_metadata.celular} \n
            Email: ${user.email} \n
            Estado: ${user.user_metadata.estado} \n
            Cidade: ${user.user_metadata.cidade} \n
            Bairro: ${user.user_metadata.bairro} \n
            Logradouro: ${user.user_metadata.logradouro} \n
            Número da casa: ${user.user_metadata.numero_casa} \n
            Complemento: ${user.user_metadata.complemento} \n
            CEP: ${user.user_metadata.cep}`);
            */
    } else {
        console.log('Nenhum usuário logado');
    }
}

// Atualizando foto de perfil
async function atualizarFotoPerfilMenu() {
    const { data, error_foto } = await supabase.auth.getUser();            // chama o Supabase pra pegar os dados do usuário que está logado no momento. - data contém os dados do usuário - error retorna um erro se houver problema (ex: usuário deslogado)
    // Tratamento de erro
    if (error_foto) {
        console.error("Erro ao buscar usuário:", error_foto.message);
        return;
    }
    // Pegando o objeto do usuário
    const user_foto = data.user;                                           // Extraímos o objeto user de data pra facilitar o acesso às infos dele.
    // Buscando a URL da foto no user_metadata
    const fotoPerfilUrl = user_foto.user_metadata?.foto_perfil;            // Aqui usamos ?. (optional chaining) pra evitar erro se user_metadata estiver indefinido.
    // Se a propriedade foto_perfil existir, ela vai ser atribuída à variável fotoPerfilUrl.
    //  Alterando a imagem da <img> se a URL existir
    if (fotoPerfilUrl) {                                                   // Se a URL estiver definida, alteramos o src da imagem com o ID fotoPerfil para exibir a foto de perfil do usuário.
        document.getElementById("icone_perfil").src = fotoPerfilUrl || "../_images/Sem-perfil.png";
    } else {                                                               // Caso contrário, só mostramos uma mensagem no console dizendo que o usuário ainda não tem imagem.
        console.log("Usuário ainda não tem foto de perfil.");
    }
}


// Renderização dinamica do menu
const HEADER_HTML = `
   <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
         <img src="/_images/Icone_Planta_03.png" alt="Logomarca da empresa SpringFy" id="img_logomarca"> 
         <span id="logomarca">SpringFy</span>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
               <li class="nav-item active" id="page_index"><a class="nav-link" href="/index.html">Home</a></li>
               <li class="nav-item active" id="page_sobre"><a class="nav-link" href="/_html/sobre.html">Sobre</a></li>
               <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Contato</a>
                  <ul class="dropdown-menu">
                     <li id="page_contato"><a class="nav-link-dropdown" href="/_html/contato.html">Contato</a></li>
                     <li id="page_trabalhe_conosco"><a class="nav-link-dropdown" href="/_html/trabalhe-conosco.html">Trabalhe Conosco</a></li>
                  </ul>
               </li>
               <li class="nav-item active" id="page_faq"><a class="nav-link" href="/_html/faq.html">FAQ</a></li>
               <li class="nav-item active" id="page_forum"><a class="nav-link" href="/_html/forum.html">Forum</a></li>
               <li class="nav-item active" id="page_login"><a class="nav-link" href="/_html/login.html">Login</a></li>
               <li class="nav-item active" id="page_minha_conta"><a class="nav-link" href="/_html/minha_conta.html">Sua Conta 
                  <img src="/_images/Sem-perfil.png" id="icone_perfil" class="icone_perfil" alt="icone de perfil"></a></li>
            </ul>
         </div>
      </div>
   </nav>
`;

// Renderização dinamica do rodapé
const FOOTER_HTML = `
      <em>Copyright © 2024 by Ramon Aguiar Valverde</em><br>
      <a href="https://www.facebook.com/" target="_blank" class="links">Facebook</a>
      <a href="https://www.instagram.com/" target="_blank" class="links">Instagram</a>
`;

// Aguarda a página carregar e chama a função
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza o Cabeçalho dinâmicamente 
    const CABECALHO = document.createElement('header');
    CABECALHO.innerHTML = HEADER_HTML;
    // coloca o header como primeiro filho do <body>
    document.body.insertAdjacentElement("afterbegin", CABECALHO);

    // Renderiza o Rodapé dinâmicamente 
    const RODAPE = document.createElement('footer');
    RODAPE.id = "pagina_rodape";
    RODAPE.innerHTML = FOOTER_HTML;
    // coloca o header como primeiro filho do <body>
    document.body.insertAdjacentElement("beforeend", RODAPE);
});