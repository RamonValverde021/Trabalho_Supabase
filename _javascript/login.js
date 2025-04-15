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

async function loginGoogle(params) {

    let { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'Google'
      })
    
}

