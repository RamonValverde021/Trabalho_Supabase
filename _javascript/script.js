

let aumentar = true; // Controla se o tamanho da fonte deve aumentar ou diminuir

function alterarFonte() {
    // Se estiver aumentando, ajusta para 20px a mais em todos os elementos
    const elementos = document.querySelectorAll('a, p, b, em, h1, h2, h3, h4, h5, h6, span, div, ul, li, button, input, legend, label, textarea, select');

    elementos.forEach(elemento => {
        // Obtém o tamanho atual da fonte do elemento
        let fontSize = window.getComputedStyle(elemento).fontSize;
        fontSize = parseInt(fontSize); // Converte para inteiro

        // Ajusta o tamanho com base na variável "aumentar"
        if (aumentar) {
            elemento.style.fontSize = (fontSize + 10) + 'px';

            const radios = document.querySelectorAll('input[name="sexo"]');
            radios.forEach(radio => {
                radio.style = "height: 28px; width: 28px";
            });

        } else {
            elemento.style.fontSize = (fontSize - 10) + 'px';

            const radios = document.querySelectorAll('input[name="sexo"]');
            radios.forEach(radio => {
                radio.style = "height: 18px; width: 18px";
            });
        }
    });

    // Alterna entre aumentar e diminuir
    aumentar = !aumentar;
}
