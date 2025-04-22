// Obejto JavaScript
const jsonADR = {
   Id: 'SpringFy',
   Designação: 'Gravação',
   Dados: {
      Categoria: 'Atraso_de_Regra',
      Comando: {
         Atuador: null,
         Data: null
      }
   }
}

const dataAtual = new Date();
// Obtém os componentes da data atual
const ano = dataAtual.getFullYear();
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês de 0-11 para 1-12
const dia = String(dataAtual.getDate()).padStart(2, '0');
// Formata a data no formato YYYY-MM-DD
const dataFormatada = `${ano}-${mes}-${dia}`;
// Define o valor do atributo min do input de data
document.getElementById("data_adr").setAttribute('min', dataFormatada);
// Define o valor do atributo value 
document.getElementById("data_adr").setAttribute('value', dataFormatada);

function atrasoDeRegra() {
   var zona = document.getElementById("slt_adr").value;
   var data = document.getElementById("data_adr").value;
   switch (zona) {
      case "z1":
         jsonADR.Dados.Comando.Atuador = 'Zona_1';
         break;
      case "z2":
         jsonADR.Dados.Comando.Atuador = 'Zona_2';
         break;
      case "z3":
         jsonADR.Dados.Comando.Atuador = 'Zona_3';
         break;
      case "z4":
         jsonADR.Dados.Comando.Atuador = 'Zona_4';
         break;
      case "z5":
         jsonADR.Dados.Comando.Atuador = 'Zona_5';
         break;
   }

   // Verifica se o input de data tem um valor
   if (data) {
      // Divide a string da data nos componentes ano, mês e dia
      const [ano, mes, dia] = data.split('-');
      jsonADR.Dados.Comando.Data = dia + "/" + mes + "/" + ano;
   } else {
      console.log('Por favor, selecione uma data.');
   }

   //sock.send(jsonADR);
   const formattedJson = JSON.stringify(jsonADR, null, 2);
   document.getElementById('saida_json').textContent = formattedJson;
}