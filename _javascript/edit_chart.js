//Chart.defaults.color = '#F8F8FF'; // Legendas, letras e numeros
//Chart.defaults.borderColor = '#F8F8FF'; // Linhas de Grade
Chart.defaults.font.size = 15;

// Grafico de Linha
const ctx1 = document.getElementById("line-chart");
var chartGraph1 = new Chart(ctx1, {
   type: 'line',
   data: {
      labels: ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
      datasets: [{
         label: "Bilhões de Reais",
         data: [4.5, 5.4, 7.0, 9.0, 10.0, 12.0, 13.0, 15.0, 16.0, 16.0, 18.0, 21.0, 24.1], // Cada numero é referente ao seu mês seguindo a ordem, ex: Jan = 5
         borderWidth: 3,
         borderColor: 'rgb(54, 162, 235)',
         backgroundColor: 'rgb(54, 162, 235)' // transparent
      }]
   },
   options: {
      plugins: {
         title: {
            display: true,
            text: 'Evolução do PRONAF no Plano Safra da Agricultura Familiar',
            fullSize: true,
            font: {
               size: 20 // Muda o tamanho do titulo
            }
         }
      }
   }
});

// Grafico de Barra
const ctx2 = document.getElementById("bar-chart");
const stackedBar = new Chart(ctx2, {
   type: 'bar',
   data: {
      labels: ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013"],
      datasets: [{
         label: 'Milhões de Reais',
         data: [144.92, 180.0, 333.06, 492.09, 461.06, 509.47, 591.03, 675.13, 667.32, 885.54, 437.77],
         backgroundColor: [
            'rgba(54, 162, 235, 0.6)'
         ],
         borderColor: [
            'rgb(54, 162, 235)',
         ],
         borderWidth: 1
      }]
   },
   options: {
      scales: {
         x: {
            stacked: true
         },
         y: {
            stacked: true
         }
      },
      plugins: {
         title: {
            display: true,
            text: 'Avanço nos Recursos Aplicados no PAA',
            fullSize: true,
            font: {
               size: 20 // Muda o tamanho do titulo
            }
         }
      }
   }
});
