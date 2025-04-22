// Obejto JavaScript
const jsonAcionar = {
   Id: 'SpringFy',
   Designação: 'Acionamento',
   Dados: {
      Atuador: null,
      Comando: null,
      Tempo: null
   }
}

function rangeTempoAcionar(valor) {
   document.getElementById("divisao_2_acionar").style.backgroundColor = "white";
   var info = document.getElementById("info_tempo_acionar");
   if (valor <= 1) {
      info.innerText = valor + " minuto";
   } else if (valor == 60) {
      info.innerText = "1 Hora";
   } else {
      info.innerText = valor + " minutos";
   }
   jsonAcionar.Dados.Tempo = Number.parseInt(valor);
}

function acionarZona(zona) {
   jsonAcionar.Dados.Comando = 'Acionar';
   switch (zona) {
      case 1:
         jsonAcionar.Dados.Atuador = 'Zona_1';
         break;
      case 2:
         jsonAcionar.Dados.Atuador = 'Zona_2';
         break;
      case 3:
         jsonAcionar.Dados.Atuador = 'Zona_3';
         break;
      case 4:
         jsonAcionar.Dados.Atuador = 'Zona_4';
         break;
      case 5:
         jsonAcionar.Dados.Atuador = 'Zona_5';
         break;
      case 6:
         jsonAcionar.Dados.Atuador = 'Zona_6';
         break;
   }
   if (jsonAcionar.Dados.Tempo == null) {
      window.alert("O tempo de ativação da irrigação não foi definido!");
      document.getElementById("divisao_2_acionar").style.backgroundColor = "rgba(0, 153, 51, 0.5)";
   } else {
      // Envia o json via websocket
      //sock.send(jsonAcionar); 
      // Converte o objeto JavaScript em uma string formatada para exibição
      const formattedJson = JSON.stringify(jsonAcionar, null, 2);
      // Exibe o JSON formatado no elemento <pre>
      document.getElementById('saida_json').textContent = formattedJson;
   }
}

function pararZona(zona) {
   document.getElementById("range_tempo_acionar").value = 0;
   document.getElementById("info_tempo_acionar").innerText = "Tempo";
   jsonAcionar.Dados.Comando = 'Parar';
   switch (zona) {
      case 1:
         jsonAcionar.Dados.Atuador = 'Zona_1';
         break;
      case 2:
         jsonAcionar.Dados.Atuador = 'Zona_2';
         break;
      case 3:
         jsonAcionar.Dados.Atuador = 'Zona_3';
         break;
      case 4:
         jsonAcionar.Dados.Atuador = 'Zona_4';
         break;
      case 5:
         jsonAcionar.Dados.Atuador = 'Zona_5';
         break;
      case 6:
         jsonAcionar.Dados.Atuador = 'Zona_6';
         break;
   }
   delete jsonAcionar.Dados.Tempo; // Deleta a chave Tempo, porque não usa no comando de parar
   // Envia o json via websocket
   //sock.send(jsonAcionar); 
   const formattedJson = JSON.stringify(jsonAcionar, null, 2);
   document.getElementById('saida_json').textContent = formattedJson;
}