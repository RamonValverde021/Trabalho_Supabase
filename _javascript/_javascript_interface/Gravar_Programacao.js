// Obejto JavaScript
const jsonGravacao = {
   Id: 'SpringFy',
   Designação: 'Gravação',
   Dados: {
      Categoria: 'Programação_Zona',
      Comando: {
         Atuador: null,
         Ativada: false,
         Nome: null,
         Domingo: false,
         Segunda: false,
         Terça: false,
         Quarta: false,
         Quinta: false,
         Sexta: false,
         Sábado: false,
         Tempo: null,
         Horário_1: null,
         Horário_2: null,
         Horário_3: null,
         Horário_4: null,
         Horário_5: null
      }
   }
}

function rangeTempoProg(valor) {
   document.getElementById("section_2_programar").style.backgroundColor = "white"; // Quando o valor do range é alterado muda para branco o background da área
   var info = document.getElementById("info_tempo_programar");
   if (valor <= 1) {
      info.innerText = valor + " minuto";
   } else if (valor == 60) {
      info.innerText = "1 Hora";
   } else {
      info.innerText = valor + " minutos";
   }
   jsonGravacao.Dados.Comando.Tempo = Number.parseInt(valor);
}

var domingo_prog = false;
var segunda_prog = false;
var terca_prog = false;
var quarta_prog = false;
var quinta_prog = false;
var sexta_prog = false;
var sabado_prog = false;
var todos_marcados_prog = false;
var todos_desmarcados_prog = true;

function chkDiasProg(dia) {
   document.getElementById("section_1_programar").style.backgroundColor = "white"; // Quando algum checkbox é marcado muda para branco o background da área
   var chk_domingo_prog = document.getElementById("chk_domingo_prog");
   var chk_segunda_prog = document.getElementById("chk_segunda_prog");
   var chk_terca_prog = document.getElementById("chk_terca_prog");
   var chk_quarta_prog = document.getElementById("chk_quarta_prog");
   var chk_quinta_prog = document.getElementById("chk_quinta_prog");
   var chk_sexta_prog = document.getElementById("chk_sexta_prog");
   var chk_sabado_prog = document.getElementById("chk_sabado_prog");
   var chk_todos_prog = document.getElementById("chk_todos_prog");

   switch (dia) {
      case "dom":
         chk_domingo_prog.checked == true ? domingo_prog = true : domingo_prog = false;
         break;
      case "seg":
         chk_segunda_prog.checked == true ? segunda_prog = true : segunda_prog = false;
         break;
      case "ter":
         chk_terca_prog.checked == true ? terca_prog = true : terca_prog = false;
         break;
      case "qua":
         chk_quarta_prog.checked == true ? quarta_prog = true : quarta_prog = false;
         break;
      case "qui":
         chk_quinta_prog.checked == true ? quinta_prog = true : quinta_prog = false;
         break;
      case "sex":
         chk_sexta_prog.checked == true ? sexta_prog = true : sexta_prog = false;
         break;
      case "sab":
         chk_sabado_prog.checked == true ? sabado_prog = true : sabado_prog = false;
         break;
      case "tds":
         if (chk_todos_prog.checked) {
            chk_domingo_prog.checked = true;
            chk_segunda_prog.checked = true;
            chk_terca_prog.checked = true;
            chk_quarta_prog.checked = true;
            chk_quinta_prog.checked = true;
            chk_sexta_prog.checked = true;
            chk_sabado_prog.checked = true;
            chk_todos_prog.checked = true;
            domingo_prog = true;
            segunda_prog = true;
            terca_prog = true;
            quarta_prog = true;
            quinta_prog = true;
            sexta_prog = true;
            sabado_prog = true;
            todos_marcados_prog = true;
            todos_desmarcados_prog = false;
         } else {
            chk_domingo_prog.checked = false;
            chk_segunda_prog.checked = false;
            chk_terca_prog.checked = false;
            chk_quarta_prog.checked = false;
            chk_quinta_prog.checked = false;
            chk_sexta_prog.checked = false;
            chk_sabado_prog.checked = false;
            chk_todos_prog.checked = false;
            domingo_prog = false;
            segunda_prog = false;
            terca_prog = false;
            quarta_prog = false;
            quinta_prog = false;
            sexta_prog = false;
            sabado_prog = false;
            todos_marcados_prog = false;
            todos_desmarcados_prog = true;
         }
         break;
   }

   if (domingo_prog && segunda_prog && terca_prog && quarta_prog && quinta_prog && sexta_prog && sabado_prog) {
      chk_todos_prog.checked = true;
      todos_marcados_prog = true;
   } else {
      chk_todos_prog.checked = false;
      todos_marcados_prog = false;
   }

   if ((domingo_prog == false) && (segunda_prog == false) && (terca_prog == false) && (quarta_prog == false) && (quinta_prog == false) && (sexta_prog == false) && (sabado_prog == false)) {
      todos_desmarcados_prog = true;
   } else {
      todos_desmarcados_prog = false;
   }

   //console.log("Todos marcados: " + todos_marcados_prog + "\nTodos desmarcados: " + todos_desmarcados_prog);
   //console.log("\ndomingo_prog: " + domingo_prog + "\nsegunda_prog: " + segunda_prog + "\nterca_prog: " + terca_prog + "\nquarta_prog: " + quarta_prog + "\nquinta_prog: " + quinta_prog + "\nsexta_prog: " + sexta_prog + "\nSábado: " + sabado_prog);
}

document.getElementById("gravar_Nome_Zona").addEventListener("click", myFunction_2);

function myFunction_2() {
   document.getElementById("section_Nome_programar").style.backgroundColor = "white";
}

document.getElementById("horario_01").addEventListener("click", myFunction_1);
document.getElementById("horario_02").addEventListener("click", myFunction_1);
document.getElementById("horario_03").addEventListener("click", myFunction_1);
document.getElementById("horario_04").addEventListener("click", myFunction_1);
document.getElementById("horario_05").addEventListener("click", myFunction_1);

function myFunction_1() {
   document.getElementById("section_3_programar").style.backgroundColor = "white";
}

function gravarProgramacao() {
   var nome = document.getElementById("gravar_Nome_Zona").value;
   jsonGravacao.Dados.Comando.Ativada = true;
   jsonGravacao.Dados.Comando.Nome = nome;

   var zona = document.getElementById("slt_programar_zona").value;
   var horario_01 = document.getElementById("horario_01").value;
   var horario_02 = document.getElementById("horario_02").value;
   var horario_03 = document.getElementById("horario_03").value;
   var horario_04 = document.getElementById("horario_04").value;
   var horario_05 = document.getElementById("horario_05").value;
   switch (zona) {
      case "z1":
         jsonGravacao.Dados.Comando.Atuador = 'Zona_1';
         break;
      case "z2":
         jsonGravacao.Dados.Comando.Atuador = 'Zona_2';
         break;
      case "z3":
         jsonGravacao.Dados.Comando.Atuador = 'Zona_3';
         break;
      case "z4":
         jsonGravacao.Dados.Comando.Atuador = 'Zona_4';
         break;
      case "z5":
         jsonGravacao.Dados.Comando.Atuador = 'Zona_5';
         break;
   }
   jsonGravacao.Dados.Comando.Domingo = domingo_prog;
   jsonGravacao.Dados.Comando.Segunda = segunda_prog;
   jsonGravacao.Dados.Comando.Terça = terca_prog;
   jsonGravacao.Dados.Comando.Quarta = quarta_prog;
   jsonGravacao.Dados.Comando.Quinta = quinta_prog;
   jsonGravacao.Dados.Comando.Sexta = sexta_prog;
   jsonGravacao.Dados.Comando.Sábado = sabado_prog;

   horario_01 ? jsonGravacao.Dados.Comando.Horário_1 = horario_01 : jsonGravacao.Dados.Comando.Horário_1 = null;
   horario_02 ? jsonGravacao.Dados.Comando.Horário_2 = horario_02 : jsonGravacao.Dados.Comando.Horário_2 = null;
   horario_03 ? jsonGravacao.Dados.Comando.Horário_3 = horario_03 : jsonGravacao.Dados.Comando.Horário_3 = null;
   horario_04 ? jsonGravacao.Dados.Comando.Horário_4 = horario_04 : jsonGravacao.Dados.Comando.Horário_4 = null;
   horario_05 ? jsonGravacao.Dados.Comando.Horário_5 = horario_05 : jsonGravacao.Dados.Comando.Horário_5 = null;


   if (nome.length != 0) {
      if (todos_desmarcados_prog == false) {
         if (jsonGravacao.Dados.Comando.Tempo != null) {
            if (horario_01 || horario_02 || horario_03 || horario_04 || horario_05) {
               // Envia o json via websocket
               //sock.send(jsonGravacao);
               const formattedJson = JSON.stringify(jsonGravacao, null, 2);
               document.getElementById('saida_json').textContent = formattedJson;
            } else {
               window.alert("Nenhum horário do dia foi configurado para irrigar!");
               document.getElementById("section_3_programar").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
            }
         } else {
            window.alert("O tempo de ativação da irrigação não foi definido!");
            document.getElementById("section_2_programar").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
         }
      } else {
         window.alert("Nenhum dia da semana foi selecionado para irrigar!");
         document.getElementById("section_1_programar").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
      }
   } else {
      window.alert("Nenhum nome para a zona foi definido!"); 
      document.getElementById("section_Nome_programar").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
   }
}