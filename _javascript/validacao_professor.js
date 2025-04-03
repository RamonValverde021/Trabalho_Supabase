
function envia_formulario(event) {
    event.preventDefault(); // Impede o envio do formulário até que as validações sejam feitas

    // Verificações do cadastramento de Professor
    var nome_professor = document.forms["formulario_professor"]["nome"].value;
    var cpf_professor = document.forms["formulario_professor"]["cpf"].value;
    var nascimento_professor = document.forms["formulario_professor"]["nascimento"].value;
    var sexo_professor = document.forms["formulario_professor"]["sexo"].value;
    var celular_professor = document.forms["formulario_professor"]["celular"].value;
    var email_professor = document.forms["formulario_professor"]["email"].value;
    var logradouro_professor = document.forms["formulario_professor"]["logradouro"].value;
    var numero_casa_professor = document.forms["formulario_professor"]["numero"].value;
    var cidade_professor = document.forms["formulario_professor"]["cidade"].value;
    var bairro_professor = document.forms["formulario_professor"]["bairro"].value;
    var cep_professor = document.forms["formulario_professor"]["cep"].value;
    var formacao_professor = document.forms["formulario_professor"]["formacao"].value;

    if (nome_professor == null || nome_professor.trim() === "") {
        alert("Nome precisa ser informado");
        document.forms["formulario_professor"]["nome"].focus();
        return false;
    }
    if (cpf_professor == null || cpf_professor.trim() === "") {
        alert("CPF precisa ser informado");
        document.forms["formulario_professor"]["cpf"].focus();
        return false;
    }
    if (nascimento_professor == null || nascimento_professor.trim() === "") {
        alert("Data de nascimento precisa ser informado");
        document.forms["formulario_professor"]["nascimento"].focus();
        return false;
    }
    if (sexo_professor == null || sexo_professor.trim() === "") {
        alert("Sexo precisa ser informado");
        document.forms["formulario_professor"]["sexo"].focus();
        return false;
    }
    if (celular_professor == null || celular_professor.trim() === "") {
        alert("Número de celular precisa ser informado");
        document.forms["formulario_professor"]["celular"].focus();
        return false;
    }
    if (email_professor == null || email_professor.trim() === "") {
        alert("E-mail precisa ser informado");
        document.forms["formulario_professor"]["email"].focus();
        return false;
    }
    if (logradouro_professor == null || logradouro_professor.trim() === "") {
        alert("Logradouro precisa ser informado");
        document.forms["formulario_professor"]["logradouro"].focus();
        return false;
    }
    if (numero_casa_professor == null || numero_casa_professor.trim() === "") {
        alert("Número da residência precisa ser informado");
        document.forms["formulario_professor"]["numero"].focus();
        return false;
    }
    if (cidade_professor == null || cidade_professor.trim() === "") {
        alert("Cidade onde reside precisa ser informado");
        document.forms["formulario_professor"]["cidade"].focus();
        return false;
    }
    if (bairro_professor == null || bairro_professor.trim() === "") {
        alert("Bairro onde reside precisa ser informado");
        document.forms["formulario_professor"]["bairro"].focus();
        return false;
    }
    if (cep_professor == null || cep_professor.trim() === "") {
        alert("CEP precisa ser informado");
        document.forms["formulario_professor"]["cep"].focus();
        return false;
    }
    if (formacao_professor == null || formacao_professor.trim() === "") {
        alert("Formação Academica precisa ser informado");
        document.forms["formulario_professor"]["formacao"].focus();
        return false;
    }

    // Se todas as validações passarem, o formulário é enviado
    //document.forms["formulario_alunos"].submit();
    window.open("obrigado.html");
}

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