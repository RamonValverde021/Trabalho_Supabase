const supabaseUrl = "https://yfslzbsaazkvofzjbkyk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmc2x6YnNhYXprdm9mempia3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDk1OTMsImV4cCI6MjA1OTA4NTU5M30.jlxk0LcLeuF60iV540i0eHHCrf43MIYXTTSKfTOCM-s";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Checa se o usuário está logado quando a página carrega
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        mostrarMenuConta(user);
    } else {
        mostrarMenuLogin();
    }
});

async function mostrarMenuConta(user) {
    document.getElementById('menu_login').style.display = 'none';
    document.getElementById('menu_conta').style.display = 'inline-block';

    if (user) {
        // Exibe os dados do usuário no console
        console.log('Nome:', user.user_metadata.nome);
        console.log('CPF:', user.user_metadata.cpf);
        console.log('Sexo:', user.user_metadata.sexo);
        console.log('Nascimento:', user.user_metadata.nascimento);
        console.log('Estado civil:', user.user_metadata.estado_civil);
        console.log('Celular:', user.user_metadata.celular);
        console.log('Email:', user.email);
        console.log('Estado:', user.user_metadata.estado);
        console.log('Cidade:', user.user_metadata.cidade);
        console.log('Bairro:', user.user_metadata.bairro);
        console.log('Logradouro:', user.user_metadata.logradouro);
        console.log('Número da casa:', user.user_metadata.numero_casa);
        console.log('Complemento:', user.user_metadata.complemento);
        console.log('CEP:', user.user_metadata.cep);
    }
}

function mostrarMenuLogin() {
    document.getElementById('menu_login').style.display = 'inline-block';
    document.getElementById('menu_conta').style.display = 'none';
}
/*
// Logout
document.getElementById('logout').addEventListener('click', async () => {
  await supabase.auth.signOut();
  location.reload(); // Recarrega a página pra atualizar o menu
});

*/

// ** Login ** //

async function login() {
    console.log("Tentando fazer login...");
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        document.getElementById("mensagem").innerText =
            "Preencha todos os campos!";
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        document.getElementById("mensagem").innerText =
            "Erro: " + error.message;
    } else {
        document.getElementById("mensagem").innerText =
            "Login realizado com sucesso!";
        localStorage.setItem("usuarioEmail", email);
        setTimeout(() => {
            window.location.href = "minha_conta.html";
        }, 2000);
    }
}

