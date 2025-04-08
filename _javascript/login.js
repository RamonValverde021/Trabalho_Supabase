const supabaseUrl = "https://yfslzbsaazkvofzjbkyk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmc2x6YnNhYXprdm9mempia3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDk1OTMsImV4cCI6MjA1OTA4NTU5M30.jlxk0LcLeuF60iV540i0eHHCrf43MIYXTTSKfTOCM-s";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
            window.location.href = "../index.html";
        }, 2000);
    }
}

// ** Cadastro ** //

// Flags booleanas de confirmação
let okEmail, okSenha, okNome, okCelular, okEstado_civil, okCPF, okIdade, okSexo, okLogradouro, okCEP, okNumero_casa, okComplemento, okEstado, okCidade, okBairro = false;

// Inicias os dados recebidos do formulario globalmente
let email_cadastro, senha_cadastro, nome, celular, estado_civil, cpf, nascimento, idade, sexo, logradouro, cep, numero_casa, complemento, estado, cidade, bairro;

// Validar E-mail
document.getElementById('email').addEventListener("input", function () {
    email_cadastro = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let feedback = document.getElementById('email_feedback');
    if (emailPattern.test(email_cadastro)) {
        feedback.innerText = '✔️ E-mail válido';
        feedback.className = "pass";
        okEmail = true;
    } else {
        feedback.innerText = '❌ E-mail inválido';
        feedback.className = "fail";
        okEmail = false;
    }
});

// Validar Senha
document.getElementById("senha").addEventListener("input", function () {
    senha_cadastro = document.getElementById('senha').value;
    let feedback = document.getElementById('senha_feedback');
    if (senha_cadastro.length >= 3) {
        feedback.innerText = '✔️ Senha válida';
        feedback.className = "pass";
        okSenha = true;
    } else {
        feedback.innerText = '❌ Senha inválida (mínimo 3 letras)';
        feedback.className = "fail";
        okSenha = false;
    }
});

// Validar Nome
document.getElementById("nome").addEventListener("input", function () {
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

async function cadastrar() {
    console.log("Tentando cadastrar...");
    if (!okEmail || !okSenha || !okNome || !okCelular || !okEstado_civil || !okCPF || !okIdade || !okSexo || !okLogradouro || !okCEP || !okNumero_casa || !okComplemento || !okEstado || !okCidade || !okBairro) {
        document.getElementById("mensagem").innerText =
            "Preencha todos os campos!";
        return;
    } else {
        console.log(email_cadastro + '\n' + senha_cadastro + '\n' + nome + '\n' + celular + '\n' + estado_civil + '\n' + cpf + '\n' + nascimento + '\n' + idade + '\n' + sexo.value + '\n' + logradouro + '\n' + cep + '\n' + numero_casa + '\n' + complemento + '\n' + estado + '\n' + cidade + '\n' + bairro);
    }

    const { data, error } = await supabase.auth.signUp({
        email: email_cadastro,
        password: senha_cadastro,
        options: {
            data: {
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

    if (error) {
        document.getElementById("mensagem").innerText =
            "Erro: " + error.message;
    } else {
        document.getElementById("mensagem").innerHTML =
            `<span class="message_progress">Cadastro realizado com sucesso!</span>
         <a class="your_email" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" target="_blank" class="links">Confirme em seu email!</a>`;
    }
}