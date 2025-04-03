
function envia_formulario(event) {
  event.preventDefault(); // Impede o envio do formulário até que as validações sejam feitas

  // Verificações do cadastramento de Aluno
  var nome_aluno = document.forms["formulario_alunos"]["nome"].value; // Obtém o valor do campo "aluno" do formulário "formalunos"
  var cpf_aluno = document.forms["formulario_alunos"]["cpf"].value; // Obtém o valor do campo "cpf" do formulário "formalunos"
  var nascimento_aluno = document.forms["formulario_alunos"]["nascimento"].value;
  var sexo_aluno = document.forms["formulario_alunos"]["sexo"].value;
  var celular_aluno = document.forms["formulario_alunos"]["celular"].value;
  var email_aluno = document.forms["formulario_alunos"]["email"].value;
  var logradouro_aluno = document.forms["formulario_alunos"]["logradouro"].value;
  var numero_casa_aluno = document.forms["formulario_alunos"]["numero"].value;
  var cidade_aluno = document.forms["formulario_alunos"]["cidade"].value;
  var bairro_aluno = document.forms["formulario_alunos"]["bairro"].value;
  var cep_aluno = document.forms["formulario_alunos"]["cep"].value;

  if (nome_aluno == null || nome_aluno.trim() === "") {
    alert("Nome precisa ser informado"); // Exibe um alerta informando que o nome do aluno deve ser preenchido
    document.forms["formulario_alunos"]["nome"].focus(); // Envia o cursor para o campo aluno do formulário "formalunos".
    return false;// Impede o envio do formulário, retornando false
  }
  if (cpf_aluno == null || cpf_aluno.trim() === "") {
    alert("CPF precisa ser informado");
    document.forms["formulario_alunos"]["cpf"].focus();
    return false;
  }
  if (nascimento_aluno == null || nascimento_aluno.trim() === "") {
    alert("Data de nascimento precisa ser informado");
    document.forms["formulario_alunos"]["nascimento"].focus();
    return false;
  }
  if (sexo_aluno == null || sexo_aluno.trim() === "") {
    alert("Sexo precisa ser informado");
    document.forms["formulario_alunos"]["sexo"].focus();
    return false;
  }
  if (celular_aluno == null || celular_aluno.trim() === "") {
    alert("Número de celular precisa ser informado");
    document.forms["formulario_alunos"]["celular"].focus();
    return false;
  }
  if (email_aluno == null || email_aluno.trim() === "") {
    alert("E-mail precisa ser informado");
    document.forms["formulario_alunos"]["email"].focus();
    return false;
  }
  if (logradouro_aluno == null || logradouro_aluno.trim() === "") {
    alert("Logradouro precisa ser informado");
    document.forms["formulario_alunos"]["logradouro"].focus();
    return false;
  }
  if (numero_casa_aluno == null || numero_casa_aluno.trim() === "") {
    alert("Número da residência precisa ser informado");
    document.forms["formulario_alunos"]["numero"].focus();
    return false;
  }
  if (cidade_aluno == null || cidade_aluno.trim() === "") {
    alert("Cidade onde reside precisa ser informado");
    document.forms["formulario_alunos"]["cidade"].focus();
    return false;
  }
  if (bairro_aluno == null || bairro_aluno.trim() === "") {
    alert("Bairro onde reside precisa ser informado");
    document.forms["formulario_alunos"]["bairro"].focus();
    return false;
  }
  if (cep_aluno == null || cep_aluno.trim() === "") {
    alert("CEP precisa ser informado");
    document.forms["formulario_alunos"]["cep"].focus();
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