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
    document.getElementById('menu_login').classList.add('menu_visible');
    document.getElementById('menu_conta').classList.add('menu_hide');
}

// Teste para exibir dados do usuario logado
async function mostrarMenuConta(user) {
    document.getElementById('menu_login').classList.add('menu_hide');
    document.getElementById('menu_conta').classList.add('menu_visible');

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