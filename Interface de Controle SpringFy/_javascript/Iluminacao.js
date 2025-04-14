// Obejto JavaScript
const jsonIluminacao = {
   Id: 'SpringFy',
   Designação: 'Gravação',
   Dados: {
      Categoria: 'Iluminação',
      Comando: {
         Domingo: false,
         Segunda: false,
         Terça: false,
         Quarta: false,
         Quinta: false,
         Sexta: false,
         Sábado: false,
         Horario_Início: null,
         Horario_Término: null
      }
   }
}

var domingo_ilu = false;
var segunda_ilu = false;
var terca_ilu = false;
var quarta_ilu = false;
var quinta_ilu = false;
var sexta_ilu = false;
var sabado_ilu = false;
var todos_marcados_ilu = false;
var todos_desmarcados_ilu = true;

function chkDiasIlu(dia) {
   document.getElementById("section_1_iluminacao").style.backgroundColor = "white";
   var chk_domingo_ilu = document.getElementById("chk_domingo_ilu");
   var chk_segunda_ilu = document.getElementById("chk_segunda_ilu");
   var chk_terca_ilu = document.getElementById("chk_terca_ilu");
   var chk_quarta_ilu = document.getElementById("chk_quarta_ilu");
   var chk_quinta_ilu = document.getElementById("chk_quinta_ilu");
   var chk_sexta_ilu = document.getElementById("chk_sexta_ilu");
   var chk_sabado_ilu = document.getElementById("chk_sabado_ilu");
   var chk_todos_ilu = document.getElementById("chk_todos_ilu");
   switch (dia) {
      case "dom":
         chk_domingo_ilu.checked == true ? domingo_ilu = true : domingo_ilu = false;
         break;
      case "seg":
         chk_segunda_ilu.checked == true ? segunda_ilu = true : segunda_ilu = false;
         break;
      case "ter":
         chk_terca_ilu.checked == true ? terca_ilu = true : terca_ilu = false;
         break;
      case "qua":
         chk_quarta_ilu.checked == true ? quarta_ilu = true : quarta_ilu = false;
         break;
      case "qui":
         chk_quinta_ilu.checked == true ? quinta_ilu = true : quinta_ilu = false;
         break;
      case "sex":
         chk_sexta_ilu.checked == true ? sexta_ilu = true : sexta_ilu = false;
         break;
      case "sab":
         chk_sabado_ilu.checked == true ? sabado_ilu = true : sabado_ilu = false;
         break;
      case "tds":
         if (chk_todos_ilu.checked) {
            chk_domingo_ilu.checked = true;
            chk_segunda_ilu.checked = true;
            chk_terca_ilu.checked = true;
            chk_quarta_ilu.checked = true;
            chk_quinta_ilu.checked = true;
            chk_sexta_ilu.checked = true;
            chk_sabado_ilu.checked = true;
            chk_todos_ilu.checked = true;
            domingo_ilu = true;
            segunda_ilu = true;
            terca_ilu = true;
            quarta_ilu = true;
            quinta_ilu = true;
            sexta_ilu = true;
            sabado_ilu = true;
            todos_marcados_ilu = true;
            todos_desmarcados_ilu = false;
         } else {
            chk_domingo_ilu.checked = false;
            chk_segunda_ilu.checked = false;
            chk_terca_ilu.checked = false;
            chk_quarta_ilu.checked = false;
            chk_quinta_ilu.checked = false;
            chk_sexta_ilu.checked = false;
            chk_sabado_ilu.checked = false;
            chk_todos_ilu.checked = false;
            domingo_ilu = false;
            segunda_ilu = false;
            terca_ilu = false;
            quarta_ilu = false;
            quinta_ilu = false;
            sexta_ilu = false;
            sabado_ilu = false;
            todos_marcados_ilu = false;
            todos_desmarcados_ilu = true;
         }
         break;
   }

   if (domingo_ilu && segunda_ilu && terca_ilu && quarta_ilu && quinta_ilu && sexta_ilu && sabado_ilu) {
      chk_todos_ilu.checked = true;
      todos_marcados_ilu = true;
   } else {
      chk_todos_ilu.checked = false;
      todos_marcados_ilu = false;
   }

   if ((domingo_ilu == false) && (segunda_ilu == false) && (terca_ilu == false) && (quarta_ilu == false) && (quinta_ilu == false) && (sexta_ilu == false) && (sabado_ilu == false)) {
      todos_desmarcados_ilu = true;
   } else {
      todos_desmarcados_ilu = false;
   }

   //console.log("Todos marcados: " + todos_marcados_ilu + "\nTodos desmarcados: " + todos_desmarcados_ilu);
   //console.log("\ndomingo_ilu: " + domingo_ilu + "\nsegunda_ilu: " + segunda_ilu + "\nterca_ilu: " + terca_ilu + "\nquarta_ilu: " + quarta_ilu + "\nquinta_ilu: " + quinta_ilu + "\nsexta_ilu: " + sexta_ilu + "\nSábado: " + sabado_ilu);
}

document.getElementById("horario_inicio").addEventListener("click", myFunction2);
document.getElementById("horario_termino").addEventListener("click", myFunction2);

function myFunction2() {
   document.getElementById("section_2_iluminacao").style.backgroundColor = "white";
}

function iluminacao() {
   var horario_inicio = document.getElementById("horario_inicio").value;
   var horario_termino = document.getElementById("horario_termino").value;
   jsonIluminacao.Dados.Comando.Domingo = domingo_ilu;
   jsonIluminacao.Dados.Comando.Segunda = segunda_ilu;
   jsonIluminacao.Dados.Comando.Terça = terca_ilu;
   jsonIluminacao.Dados.Comando.Quarta = quarta_ilu;
   jsonIluminacao.Dados.Comando.Quinta = quinta_ilu;
   jsonIluminacao.Dados.Comando.Sexta = sexta_ilu;
   jsonIluminacao.Dados.Comando.Sábado = sabado_ilu;

   horario_inicio ? jsonIluminacao.Dados.Comando.Horario_Início = horario_inicio : jsonIluminacao.Dados.Comando.Horario_Início = null;
   horario_termino ? jsonIluminacao.Dados.Comando.Horario_Término = horario_termino : jsonIluminacao.Dados.Comando.Horario_Término = null;

   if (todos_desmarcados_ilu == false) {
      if (horario_inicio) {
         if (horario_termino) {
            //sock.send(comando); 
            const formattedJson = JSON.stringify(jsonIluminacao, null, 2);
            document.getElementById('saida_json').textContent = formattedJson;
         } else {
            window.alert("O horário de desligamento da iluminação não esta configurado!");
            document.getElementById("section_2_iluminacao").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
         }
      } else {
         window.alert("O horário de início da iluminação não esta configurado!");
         document.getElementById("section_2_iluminacao").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
      }
   } else {
      window.alert("Nenhum dia da semana foi selecionado para iluminar!");
      document.getElementById("section_1_iluminacao").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
   }
}