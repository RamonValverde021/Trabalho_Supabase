// Logout
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "../index.html";
}

// Flags booleanas de confirmação
let okSenha, okNome, okCelular, okEstado_civil, okCPF, okIdade, okSexo, okLogradouro, okCEP, okNumero_casa, okComplemento, okEstado, okCidade, okBairro = true;

// Inicias os dados recebidos do formulario globalmente
let senha_cadastro, nome, celular, estado_civil, cpf, nascimento, sexo, logradouro, cep, numero_casa, complemento, estado, cidade, bairro;

// Checa se o usuário está logado quando a página carrega
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser();

    // Exibe o painel de informações do usuário
    document.getElementById("meu_perfil").style.display = "block";
    document.getElementById("edit_perfil").style.display = "none";
    /*
        document.getElementById("meu_perfil").style.display = "none";
        document.getElementById("edit_perfil").style.display = "block";
    */
    // Exibe os dados cadastrados da conta
    document.getElementById("nome_usuario").innerText = user.user_metadata.nome;
    document.getElementById("email_usuario").innerText = user.email.toLowerCase();
    document.getElementById("data_nome_completo").innerText = user.user_metadata.nome.toLowerCase();
    document.getElementById("data_cpf").innerText = user.user_metadata.cpf;
    document.getElementById("data_celular").innerText = user.user_metadata.celular;

    let partes = user.user_metadata.nascimento.split("-"); // ["1998", "06", "24"]
    let dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    document.getElementById("data_nascimento").innerText = dataFormatada;
    document.getElementById("data_civil").innerText = user.user_metadata.estado_civil.toLowerCase();
    document.getElementById("data_sexo").innerText = user.user_metadata.sexo;
    document.getElementById("data_logradouro").innerText = user.user_metadata.logradouro.toLowerCase();
    document.getElementById("data_cep").innerText = user.user_metadata.cep;
    document.getElementById("data_numero_casa").innerText = user.user_metadata.numero_casa;
    document.getElementById("data_complemento").innerText = user.user_metadata.complemento.toLowerCase();
    document.getElementById("data_bairro").innerText = user.user_metadata.bairro.toLowerCase();
    document.getElementById("data_cidade").innerText = user.user_metadata.cidade.toLowerCase();
    document.getElementById("data_estado").innerText = user.user_metadata.estado;

    // Exibe o painel de edição de dados do usuário
    document.getElementById("editar_usuario").addEventListener('click', () => {
        document.getElementById("meu_perfil").style.display = "none";
        document.getElementById("edit_perfil").style.display = "block";

        // Carrega os dados da conta nos campos de edição
        // Identificação
        document.getElementById("nome").placeholder = user.user_metadata.nome;
        document.getElementById("celular").placeholder = user.user_metadata.celular;
        document.getElementById("estado_civil").value = user.user_metadata.estado_civil;
        document.getElementById("cpf").placeholder = user.user_metadata.cpf;
        document.getElementById("nascimento").value = user.user_metadata.nascimento;
        if (user.user_metadata.sexo === 'Masculino') {
            document.getElementById("masculino").checked = true;
            document.getElementById("feminino").checked = false;
        } else {
            document.getElementById("masculino").checked = false;
            document.getElementById("feminino").checked = true;
        }
        document.getElementById("logradouro").placeholder = user.user_metadata.logradouro;
        document.getElementById("cep").placeholder = user.user_metadata.cep;
        document.getElementById("numero_casa").placeholder = user.user_metadata.numero_casa;
        document.getElementById("complemento").placeholder = user.user_metadata.complemento;
        document.getElementById("estado").value = user.user_metadata.estado;
        document.getElementById("cidade").placeholder = user.user_metadata.cidade;
        document.getElementById("bairro").placeholder = user.user_metadata.bairro;
    });

    // Cancela a edição e torna a exibir o painel de informações do usuário
    document.getElementById("btn_cancelar").addEventListener('click', () => {
        document.getElementById("meu_perfil").style.display = "block";
        document.getElementById("edit_perfil").style.display = "none";
    });

    // Incrementação de varaiaveis para edição de cadastro
    senha_cadastro = "123456";
    nome = user.user_metadata.nome;
    celular = user.user_metadata.celular;
    estado_civil = user.user_metadata.estado_civil;
    cpf = user.user_metadata.cpf;
    nascimento = user.user_metadata.nascimento;
    sexo = user.user_metadata.sexo;
    logradouro = user.user_metadata.logradouro;
    cep = user.user_metadata.cep;
    numero_casa = user.user_metadata.numero_casa;
    complemento = user.user_metadata.complemento;
    estado = user.user_metadata.estado;
    cidade = user.user_metadata.cidade;
    bairro = user.user_metadata.bairro;


    const { data, error_foto } = await supabase.auth.getUser();
    if (error_foto) {
      console.error("Erro ao buscar usuário:", error_foto.message);
      return;
    }
    const user_foto = data.user;
    const fotoPerfilUrl = user_foto.user_metadata?.foto_perfil;
    if (fotoPerfilUrl) {
      document.getElementById("icone_perfil_info").src = fotoPerfilUrl;
      document.getElementById("preview_foto").src = fotoPerfilUrl;
    } else {
      console.log("Usuário ainda não tem foto de perfil.");
    }

});







/* -------------------------- CODIGO DA VALIDAÇÃO DO FORMULARIO DE EDIÇÃO -------------------------- */

// Habilitar painel de edição de senha
document.getElementById("mudar_senha").style.display = "none";
document.getElementById("btn_mudar_senha").addEventListener('click', () => {
    if (document.getElementById("mudar_senha").style.display == "none") {
        document.getElementById("mudar_senha").style.display = "inline";
        document.getElementById("btn_mudar_senha").style.display = "none";
    } else {
        document.getElementById("mudar_senha").style.display = "none";
    }
});

// Botão cancelar correção de senha
document.getElementById("btn_cancelar_senha").addEventListener('click', () => {
    document.getElementById('senha_feedback').innerText = "";
    // Torna visivel o botão e o culta o painel de preenchimento
    document.getElementById("mudar_senha").style.display = "none";
    document.getElementById("btn_mudar_senha").style.display = "inline";
    // Apaga os dados preenchidos nos campos
    document.getElementById("senha_antiga").value = "";
    document.getElementById("nova_senha").value = "";
    document.getElementById("repete_senha").value = "";
});

// Botão salvar e validar senha nova
document.getElementById("btn_salvar_senha").addEventListener('click', () => {
    let senha_antiga = document.getElementById("senha_antiga").value;
    let nova_senha = document.getElementById("nova_senha").value;
    let repete_senha = document.getElementById("repete_senha").value;
    let feedback = document.getElementById('senha_feedback');

    if (senha_antiga == "123456") {
        if (nova_senha.length >= 3) {
            if (nova_senha == repete_senha) {
                feedback.innerText = '✔️ Senha válida';
                feedback.className = "pass";
                okSenha = true;
            } else {
                feedback.innerText = '❌ A senha repetida não está igual a nova';
                feedback.className = "fail";
                okSenha = false;
            }
        } else {
            feedback.innerText = '❌ Nova senha inválida (mínimo 3 letras)';
            feedback.className = "fail";
            okSenha = false;
        }
    } else {
        feedback.innerText = '❌ Senha antiga invalida';
        feedback.className = "fail";
        okSenha = false;
    }
});







// Validar Nome
document.getElementById("nome").addEventListener("input", function () {
    okNome = false;
    nome = document.getElementById('nome').value;
    let feedback = document.getElementById('nome_feedback');
    if (nome.length >= 5) {
        feedback.innerText = '✔️ Nome válido';
        feedback.className = "pass";
        okNome = true;
    } else {
        feedback.innerText = '❌ Nome inválido (mínimo 3 letras)';
        feedback.className = "fail";
        okNome = false;
    }
});

// Validar Celular
document.getElementById('celular').addEventListener("input", function () {
    okCelular = false;
    celular = document.getElementById('celular').value;
    let feedback = document.getElementById('celular_feedback');
    if (celular.length == 15) {
        feedback.innerText = '✔️ Celular válido';
        feedback.className = "pass";
        okCelular = true;
    } else {
        feedback.innerText = '❌ Celular inválido';
        feedback.className = "fail";
        okCelular = false;
    }
});

// Validar Estado Civil
document.getElementById('estado_civil').addEventListener("click", function () {
    okEstado_civil = false;
    estado_civil = document.getElementById('estado_civil').value;
    let feedback = document.getElementById('estado_civil_feedback');
    if (estado_civil) {
        feedback.innerText = '✔️ Estado civil válido';
        feedback.className = "pass";
        okEstado_civil = true;
    } else {
        feedback.innerText = '❌ Estado civil inválido (Escolha uma opção)';
        feedback.className = "fail";
        okEstado_civil = false;
    }
});

// Validar CPF
document.getElementById('cpf').addEventListener("input", function () {
    okCPF = false;
    cpf = document.getElementById('cpf').value;
    let feedback = document.getElementById('cpf_feedback');
    if (validarCPF(cpf)) {
        feedback.innerText = '✔️ CPF válido';
        feedback.className = "pass";
        okCPF = true;
    } else {
        feedback.innerText = '❌ CPF inválido';
        feedback.className = "fail";
        okCPF = false;
    }
});
// Função para validar código CPF
function validarCPF(cpf) {
    if (cpf.length < 14) return false;
    const strCPF = cpf.replace(/[.-]/g, ""); // Limpa o cpf

    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

// Validar Nascimento e Idade
document.getElementById("nascimento").addEventListener("input", function () {
    okIdade = false;
    nascimento = document.getElementById("nascimento").value;
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    const anoNascimento = new Date(nascimento).getFullYear();
    idade = anoAtual - anoNascimento;
    let feedback = document.getElementById('nascimento_feedback');
    if (idade >= 18 && idade <= 120) {
        feedback.innerText = '✔️ Idade válida';
        feedback.className = "pass";
        okIdade = true;
    } else {
        feedback.innerText = '❌ Idade inválida (deve ser entre 18 e 120 anos)';
        feedback.className = "fail";
        okIdade = false;
    }
});

// Validar Sexo
// Adiciona um event listener para ouvir as mudanças nos radio buttons
const radios = document.querySelectorAll('input[name="sexo"]');
radios.forEach(radio => {
    radio.addEventListener('change', mostrarMensagem);
});

// Função para exibir a mensagem com base na seleção
function mostrarMensagem() {
    sexo = document.querySelector('input[name="sexo"]:checked'); // Seleciona o botão de rádio selecionado
    // Obtém todos os inputs do tipo "radio" com o nome 'sexo'
    const radios = document.querySelectorAll('input[name="sexo"]');
    // Itera sobre os radios para verificar qual foi marcado
    radios.forEach(radio => {
        if (radio.checked) {
            const mensagem = radio.value;
            let feedback = document.getElementById('sexo_feedback');
            if (mensagem === 'Masculino' || mensagem === 'Feminino') {
                feedback.innerText = '✔️ Sexo válido';
                feedback.className = "pass";
                okSexo = true;
            } else {
                feedback.innerText = '❌ Sexo inválido';
                feedback.className = "fail";
                okSexo = false;
            }
        }
    });
}

// Validar Logradouro
document.getElementById("logradouro").addEventListener("input", function () {
    okLogradouro = false;
    logradouro = document.getElementById('logradouro').value;
    let feedback = document.getElementById('logradouro_feedback');
    if (logradouro.length >= 3) {
        feedback.innerText = '✔️ Logradouro válido';
        feedback.className = "pass";
        okLogradouro = true;
    } else {
        feedback.innerText = '❌ Logradouro inválido (mínimo 5 letras)';
        feedback.className = "fail";
        okLogradouro = false;
    }
});

// Validar CEP
document.getElementById('cep').addEventListener("input", function () {
    okCEP = false;
    cep = document.getElementById('cep').value;
    let feedback = document.getElementById('cep_feedback');
    if (cep.length == 9) {
        feedback.innerText = '✔️ CEP válido';
        feedback.className = "pass";
        okCEP = true;
    } else {
        feedback.innerText = '❌ CEP inválido';
        feedback.className = "fail";
        okCEP = false;
    }
});

// Validar Número da Casa
document.getElementById("numero_casa").addEventListener("input", function () {
    okNumero_casa = false;
    numero_casa = document.getElementById('numero_casa').value;
    let feedback = document.getElementById('numero_casa_feedback');
    if (numero_casa >= 1) {
        feedback.innerText = '✔️ Número da casa válido';
        feedback.className = "pass";
        okNumero_casa = true;
    } else {
        feedback.innerText = '❌ Número da casa inválido (mínimo 1 número)';
        feedback.className = "fail";
        okNumero_casa = false;
    }
});

// Validar Complemento
document.getElementById("complemento").addEventListener("input", function () {
    okComplemento = false;
    complemento = document.getElementById('complemento').value;
    let feedback = document.getElementById('complemento_feedback');
    if (complemento.length >= 3) {
        feedback.innerText = '✔️ Complemento válido';
        feedback.className = "pass";
        okComplemento = true;
    } else {
        feedback.innerText = '❌ Complemento inválido (mínimo 3 letras)';
        feedback.className = "fail";
        okComplemento = false;
    }
});

// Validar Estado
document.getElementById("estado").addEventListener("click", function () {
    okEstado = false;
    estado = document.getElementById('estado').value;
    let feedback = document.getElementById('estado_feedback');
    if (estado) {
        feedback.innerText = '✔️ Estado válido';
        feedback.className = "pass";
        okEstado = true;
    } else {
        feedback.innerText = '❌ Estado inválido (escolha uma opção)';
        feedback.className = "fail";
        okEstado = false;
    }
});

// Validar Cidade
document.getElementById("cidade").addEventListener("input", function () {
    okCidade = false;
    cidade = document.getElementById('cidade').value;
    let feedback = document.getElementById('cidade_feedback');
    if (cidade.length >= 3) {
        feedback.innerText = '✔️ Cidade válida';
        feedback.className = "pass";
        okCidade = true;
    } else {
        feedback.innerText = '❌ Cidade inválida (mínimo 3 letras)';
        feedback.className = "fail";
        okCidade = false;
    }
});

// Validar Bairro
document.getElementById("bairro").addEventListener("input", function () {
    okBairro = false;
    bairro = document.getElementById('bairro').value;
    let feedback = document.getElementById('bairro_feedback');
    if (bairro.length >= 3) {
        feedback.innerText = '✔️ Bairro válido';
        feedback.className = "pass";
        okBairro = true;
    } else {
        feedback.innerText = '❌ Bairro inválido (mínimo 3 letras)';
        feedback.className = "fail";
        okBairro = false;
    }
});



// Função que incrementa automaticamente os campos
function autoincremento(dado, tipo) {
    var valor = dado.value;
    if (isNaN(valor[valor.length - 1])) {
        dado.value = valor.substring(0, valor.length - 1);
        return;
    }
    if (tipo == "CPF") {
        dado.setAttribute("maxlength", "14");
        if (valor.length == 3 || valor.length == 7) dado.value += ".";
        if (valor.length == 11) dado.value += "-";
    }
    if (tipo == "CEL") {
        dado.setAttribute("maxlength", "15");
        if (valor.length == 1) dado.value = "(" + valor;
        if (valor.length == 3) dado.value += ") ";
        if (valor.length == 10) dado.value += "-";
    }
    if (tipo == "CEP") {
        dado.setAttribute("maxlength", "9");
        if (valor.length == 5) dado.value += "-";
    }
}







/*
async function cadastrar() {
    console.log("Tentando cadastrar...");

    if (!okEmail || !okSenha || !okNome || !okCelular || !okEstado_civil || !okCPF || !okIdade || !okSexo || !okLogradouro || !okCEP || !okNumero_casa || !okComplemento || !okEstado || !okCidade || !okBairro) {
        document.getElementById("mensagem").innerText =
            "Dados invalidos!";
        //return;
    } else {
        console.log("Sucesso!");
        //console.log(email_cadastro + '\n' + senha_cadastro + '\n' + nome + '\n' + celular + '\n' + estado_civil + '\n' + cpf + '\n' + nascimento + '\n' + idade + '\n' + sexo.value + '\n' + logradouro + '\n' + cep + '\n' + numero_casa + '\n' + complemento + '\n' + estado + '\n' + cidade + '\n' + bairro);
    }


    console.log(senha_cadastro + '\n' + nome + '\n' + celular + '\n' + estado_civil + '\n' + cpf + '\n' + nascimento + '\n' + sexo + '\n' + logradouro + '\n' + cep + '\n' + numero_casa + '\n' + complemento + '\n' + estado + '\n' + cidade + '\n' + bairro);


    /*
    const { data, error } = await supabase.auth.signUp({
        email: email_cadastro,
        password: senha_cadastro,
        options: {
            data: {
                foto_perfil: null,
                nome: nome,
                celular: celular,
                estado_civil: estado_civil,
                cpf: cpf,
                nascimento: nascimento,
                sexo: sexo.value,
                logradouro: logradouro,
                cep: cep,
                numero_casa: numero_casa,
                complemento: complemento,
                estado: estado,
                cidade: cidade,
                bairro: bairro
            }
        }
    });
    /

    if (error) {
        document.getElementById("mensagem").innerText =
            "Erro: " + error.message;
    } else {
        document.getElementById("mensagem").innerText = "Tudo certo!"
        setTimeout(() => {
            window.location.href = "obrigado.html";
        }, 2000);
    }
}
*/


// Trocar foto de perfil
function previewFotoPerfil(input) {
    const file = input.files[0];
    const preview = document.getElementById("preview_foto");
    if (file) {
        const reader = new FileReader();
        reader.onload = e => preview.src = e.target.result;
        reader.readAsDataURL(file);
    }
}


// Salvar foto de perfil
async function atualizarFotoPerfil() {
    const fileInput = document.getElementById("foto_perfil");
    console.log(fileInput);

    if (fileInput.files.length === 0) {
        alert("Selecione uma imagem.");
        return;
    }

    const file = fileInput.files[0];
    const user = (await supabase.auth.getUser()).data.user;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `fotos-perfil/${fileName}`;

    // Upload da imagem
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file, {
            contentType: file.type
        });

    if (uploadError) {
        alert("Erro ao fazer upload: " + uploadError.message);
        return;
    }

    // Gerar URL pública
    const { data: publicURL } = supabase.storage
        .from("uploads")
        .getPublicUrl(filePath);

    // Atualiza os metadados do usuário
    const { error: updateError } = await supabase.auth.updateUser({
        data: {
            foto_perfil: publicURL.publicUrl
        }
    });

    if (updateError) {
        alert("Erro ao atualizar perfil: " + updateError.message);
    } else {
        alert("Foto de perfil atualizada com sucesso!");
    }
}


