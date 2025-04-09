// Logout
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "../index.html";
}

// Checa se o usuário está logado quando a página carrega
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser()
    document.getElementById("data_user").innerText = `
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
            CEP: ${user.user_metadata.cep}`;

});
