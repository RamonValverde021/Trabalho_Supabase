/*
const sock = new WebSocket("ws://192.168.0.130:2450"); // Endereço NodeMCU
sock.onopen = function (event) {
    setTimeout(function () { sock.send('Conexão Webpage Sucedida!'); }, 1000);
    setTimeout(function () { sock.send('{"Id":"SpringFy","Designação":"Status"}'); }, 1000);
};

// Função para receber e tratar dados vindos do Dispositivo
sock.onmessage=function(event){
    document.getElementById('statusLampada').innerHTML = event.data;
    let lampada = document.getElementById('iconeLampada');
    if (isJson(event.data)) {
        const stsLmp = JSON.parse(event.data);
        if (stsLmp.status === 'Ligada') {
            lampada.src = './_imagens/_lampada_Acesa.png';
        } else if (stsLmp.status === 'Desligada') {
            lampada.src = './_imagens/_lampada_Apagada.png';
        }
    }
}
*/

// Função para verificar se é um JSON ou não
function isJson(str) {
   try {
      JSON.parse(str);
   } catch (e) {
      return false;
   }
   return true;
}