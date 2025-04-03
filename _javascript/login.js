function envia_formulario(event) {
    event.preventDefault(); // Impede o envio do formulário até que as validações sejam feitas

    // Verificações do cadastramento de Aluno
    var login = document.forms["formulario_login"]["login"].value; // Obtém o valor do campo "aluno" do formulário "formalunos"
    var senha = document.forms["formulario_login"]["senha"].value; // Obtém o valor do campo "cpf" do formulário "formalunos"

    if (login == null || login.trim() === "") {
        alert("Nome do login precisa ser informado"); // Exibe um alerta informando que o nome do aluno deve ser preenchido
        document.forms["formulario_login"]["login"].focus(); // Envia o cursor para o campo aluno do formulário "formalunos".
        return false;// Impede o envio do formulário, retornando false
    } else if (login.length < 5) {
        alert("O login precisa conter 5 digitos");
        document.forms["formulario_login"]["login"].focus();
        return false;
        // Verifica se os digitos são numéricos
    } else if (isNaN(login)) {
        alert("O login tem que ser 5 digitos numéricos");
        document.forms["formulario_login"]["login"].focus();
        return false;
        // Verifica se os digitos são impares
    } else if (!isNaN(login)) {
        let todosImpares = true;
        for (let i = 0; i < login.length; i++) {
            const numero = parseInt(login[i], 10);
            if (numero % 2 === 0) {
                todosImpares = false;
                break;
            }
        }
        if (todosImpares == false) {
            alert('O login contém números pares');
            document.forms["formulario_login"]["login"].focus();
            return false;
        }
    } else {
        console.log("É um login válido!");
    }

    if (senha == null || senha.trim() === "") {
        alert("A senha precisa ser informada");
        document.forms["formulario_login"]["senha"].focus();
        return false;
    } else if (senha.length < 4) {
        alert("A senha precisa conter 4 digitos");
        document.forms["formulario_login"]["senha"].focus();
        return false;
        // Verifica se os digitos são numéricos
    } else if (isNaN(senha)) {
        alert("A senha precisa ser 4 digitos numéricos");
        document.forms["formulario_login"]["senha"].focus();
        return false;
        // Verifica se os digitos são pares
    } else if (!isNaN(senha)) {
        let todosPares = true;
        for (let i = 0; i < senha.length; i++) {
            const numero = parseInt(senha[i], 10);
            if (numero % 2 === 0) {
                todosPares = true;
            } else {
                todosPares = false;
                break;
            }
        }
        if (todosPares == false) {
            alert('A senha contém números ímpares');
            document.forms["formulario_login"]["senha"].focus();
            return false;
        }
    } else {
        console.log("É uma senha válida!");
    }

    // Se todas as validações passarem, o formulário é enviado
    //document.forms["formulario_login"].submit();
    window.open("obrigado.html");
}

/*
function validar () {
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;

    let loginValido = /^[13579]{5}$/.test(login); // Apenas números ímpares
    let senhaValida = /^[02468]{4}$/.test(senha); // Apenas números ímpares

    if (loginValido && senhaValida) {
        alert('Login e senha válidos!');
    } else {
        alert('Login ou senha inválidos! \n \nLembre-se: \n- O login deve conter apenas 5 digitos com apenas números ímpares.');
    }
}
*/