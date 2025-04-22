// Obejto JavaScript
const jsonAutomatico = {
   Id: 'SpringFy',
   Designação: 'Gravação',
   Dados: {
      Categoria: 'Modo_Automatico',
      Comando: {
         Atuador: null,
         Ativo: false,
         Sensor_1: false,
         Sensor_2: false,
         Sensor_3: false,
         Sensor_4: false
      }
   }
}

function modoAutomatico() {
   var zona = document.getElementById("slt_automatico").value;
   var sensor_1 = document.getElementById("chk_sensor_1").checked;
   var sensor_2 = document.getElementById("chk_sensor_2").checked;
   var sensor_3 = document.getElementById("chk_sensor_3").checked;
   var sensor_4 = document.getElementById("chk_sensor_4").checked;
   switch (zona) {
      case "z1":
         jsonAutomatico.Dados.Comando.Atuador = 'Zona_1';
         break;
      case "z2":
         jsonAutomatico.Dados.Comando.Atuador = 'Zona_2';
         break;
      case "z3":
         jsonAutomatico.Dados.Comando.Atuador = 'Zona_3';
         break;
      case "z4":
         jsonAutomatico.Dados.Comando.Atuador = 'Zona_4';
         break;
      case "z5":
         jsonAutomatico.Dados.Comando.Atuador = 'Zona_5';
         break;
   }
   jsonAutomatico.Dados.Comando.Ativo = true;
   jsonAutomatico.Dados.Comando.Sensor_1 = sensor_1;
   jsonAutomatico.Dados.Comando.Sensor_2 = sensor_2;
   jsonAutomatico.Dados.Comando.Sensor_3 = sensor_3;
   jsonAutomatico.Dados.Comando.Sensor_4 = sensor_4;

   //sock.send(comando); 
   const formattedJson = JSON.stringify(jsonAutomatico, null, 2);
   document.getElementById('saida_json').textContent = formattedJson;
}