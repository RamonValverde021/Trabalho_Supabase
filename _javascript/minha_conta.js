// Logout
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "../index.html";
}

// Checa se o usuário está logado quando a página carrega
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser()

    document.getElementById("nome_usuario").innerText = `${user.user_metadata.nome}`;
    document.getElementById("email_usuario").innerText = `${user.email}`.toLowerCase();

    document.getElementById("data_nome_completo").innerText = `${user.user_metadata.nome}`.toLowerCase();
    document.getElementById("data_cpf").innerText = `${user.user_metadata.cpf}`;
    document.getElementById("data_celular").innerText = `${user.user_metadata.celular}`;
    document.getElementById("data_nascimento").innerText = `${user.user_metadata.nascimento}`;
    document.getElementById("data_civil").innerText = `${user.user_metadata.estado_civil}`.toLowerCase();
    document.getElementById("data_sexo").innerText = `${user.user_metadata.sexo}`.toLowerCase();
    document.getElementById("data_logradouro").innerText = `${user.user_metadata.logradouro}`.toLowerCase();
    document.getElementById("data_cep").innerText = `${user.user_metadata.cep}`;
    document.getElementById("data_numero_casa").innerText = `${user.user_metadata.numero_casa}`;
    document.getElementById("data_complemento").innerText = `${user.user_metadata.complemento}`.toLowerCase();
    document.getElementById("data_bairro").innerText = `${user.user_metadata.bairro}`.toLowerCase();
    document.getElementById("data_cidade").innerText = `${user.user_metadata.cidade}`.toLowerCase();
    document.getElementById("data_estado").innerText = `${user.user_metadata.estado}`;

});