// Obejto JavaScript
const jsonWiFi = {
   Id: 'SpringFy',
   Designação: 'Gravação',
   Dados: {
      Categoria: 'Wi-Fi',
      Comando: {
         ssid: null,
         password: null,
         ip: null,
         subnet: null,
         gateway: null,
         dns: null,
         port: null
      }
   }
}

function conectWiFi() { }

function autoincremento(dado, tipo) {
   var valor = dado.value;
   if (isNaN(valor[valor.length - 1])) {
      dado.value = valor.substring(0, valor.length - 1);
      return;
   }
   if (tipo == "ip") {
      dado.setAttribute("maxlength", "15"); // 192.168.000.130
      if (valor.length == 3 || valor.length == 7 || valor.length == 11) dado.value += ".";
   }
   if (tipo == "mask") {
      dado.setAttribute("maxlength", "15");
      if (valor.length == 3 || valor.length == 7 || valor.length == 11) dado.value += ".";
   }
   if (tipo == "gate") {
      dado.setAttribute("maxlength", "15");
      if (valor.length == 3 || valor.length == 7 || valor.length == 11) dado.value += ".";
   }
   if (tipo == "dns") {
      dado.setAttribute("maxlength", "15");
      if (valor.length == 3 || valor.length == 7 || valor.length == 11) dado.value += ".";
   }
}

function configWiFi() {
   var ssid = document.getElementById("ssid_wifi").value;
   var senha = document.getElementById("senha_wifi").value;
   var ip = document.getElementById("endereco_ip").value;
   var mascara = document.getElementById("mascara_ip").value;
   var gateway = document.getElementById("gateway_ip").value;
   var dns = document.getElementById("dns_ip").value;
   var porta = document.getElementById("porta_ip").value;

   if (ssid.length == 0) {
      alert("Nome do Wi-Fi precisa ser informado!"); // Exibe um alerta informando que o nome do Wi-Fi deve ser preenchido
      document.getElementById("ssid_wifi").focus(); // Envia o cursor para o campo Rede Wi-Fi.
   } else if (senha.length == 0) {
      alert("Senha do Wi-Fi precisa ser informado!");
      document.getElementById("senha_wifi").focus();
   } else if (ip.length == 0) {
      alert("IP do dispositivo precisa ser informado!");
      document.getElementById("endereco_ip").focus();
   } else if (mascara.length == 0) {
      alert("Mascara de Sub-Rede do dispositivo precisa ser informado!");
      document.getElementById("mascara_ip").focus();
   } else if (gateway.length == 0) {
      alert("Gateway padrão do dispositivo precisa ser informado!");
      document.getElementById("gateway_ip").focus();
   } else if (dns.length == 0) {
      alert("Serviço DNS do dispositivo precisa ser informado!");
      document.getElementById("dns_ip").focus();
   } else if (porta.length == 0) {
      alert("Porta de comunicação do dispositivo precisa ser informado!");
      document.getElementById("porta_ip").focus();
   } else if (porta > 999999) {
      alert("Valor da porta é um número invalido!");
      document.getElementById("porta_ip").focus();
   } else {
      jsonWiFi.Dados.Comando.ssid = ssid;
      jsonWiFi.Dados.Comando.password = senha;
      if (ip) { // Verifica se o input de data tem um valor
         let campo = formatNum(ip);
         jsonWiFi.Dados.Comando.ip = `${campo[0]}.${campo[1]}.${campo[2]}.${campo[3]}`;
      }
      if (mascara) {
         let campo = formatNum(mascara);
         jsonWiFi.Dados.Comando.subnet = `${campo[0]}.${campo[1]}.${campo[2]}.${campo[3]}`;
      }
      if (gateway) {
         let campo = formatNum(gateway);
         jsonWiFi.Dados.Comando.gateway = `${campo[0]}.${campo[1]}.${campo[2]}.${campo[3]}`;
      }
      if (dns) {
         let campo = formatNum(dns);
         jsonWiFi.Dados.Comando.dns = `${campo[0]}.${campo[1]}.${campo[2]}.${campo[3]}`;
      }
      jsonWiFi.Dados.Comando.port = Number.parseInt(porta);;
   }
   //sock.send(jsonWiFi); 
   const formattedJson = JSON.stringify(jsonWiFi, null, 2);
   document.getElementById('saida_json').textContent = formattedJson;
}

function formatNum(codigo) {
   // Divide a string da data nos componentes ano, mês e dia
   const [intervalo_1, intervalo_2, intervalo_3, intervalo_4] = codigo.split('.');
   var camp_1 = Number(intervalo_1); // Converte cada campo dividido em numero
   var camp_2 = Number(intervalo_2);
   var camp_3 = Number(intervalo_3);
   var camp_4 = Number(intervalo_4);
   return [camp_1, camp_2, camp_3, camp_4]; // retorna todos os campos convertidos dentro de um array
}