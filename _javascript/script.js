// Variaveis de inicialização do Supabase
const supabaseUrl = "https://yfslzbsaazkvofzjbkyk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmc2x6YnNhYXprdm9mempia3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDk1OTMsImV4cCI6MjA1OTA4NTU5M30.jlxk0LcLeuF60iV540i0eHHCrf43MIYXTTSKfTOCM-s";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Checa se o usuário está logado quando a página carrega
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        mostrarMenuConta(user);
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
    }
}
