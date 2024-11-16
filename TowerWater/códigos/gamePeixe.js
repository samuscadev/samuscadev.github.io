document.addEventListener("DOMContentLoaded", function () {

    const jogadorEl = document.querySelector('#player');
    let posicaoX = 0; // Posição inicial no eixo X
    let posicaoY = 0; // Posição inicial no eixo Y
    let intervaloEsquerda; // Intervalo para a seta esquerda
    let intervaloDireita; // Intervalo para a seta direita
    let intervaloCima; // Intervalo para a seta cima
    let intervaloBaixo; // Intervalo para a seta baixo
    let EsquerdaPressionada = false; // Flag para a seta esquerda
    let DireitaPressionada = false; // Flag para a seta direita
    let CimaPressionada = false; // Flag para a seta cima
    let BaixoPressionada = false; // Flag para a seta baixo

    function andarParaEsquerda() {
        posicaoX -= 10; // Move para a esquerda
        jogadorEl.style.left = `${posicaoX}px`;
        jogadorEl.style.transform = "scaleX(1)";
    }

    function andarParaDireita() {
        posicaoX += 10; // Move para a direita
        jogadorEl.style.left = `${posicaoX}px`;
        jogadorEl.style.transform = "scaleX(-1)";
    }

    function andarParaCima() {
        posicaoY -= 10; // Move para cima
        jogadorEl.style.top = `${posicaoY}px`;        
    }

    function andarParaBaixo() {
        posicaoY += 10; // Move para baixo
        jogadorEl.style.top = `${posicaoY}px`;
    }

    // Evento para detectar a seta esquerda
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && !EsquerdaPressionada) {
            EsquerdaPressionada = true;
            intervaloEsquerda = setInterval(andarParaEsquerda, 100); // Executa a cada 100ms
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft") {
            EsquerdaPressionada = false;
            clearInterval(intervaloEsquerda); // Para o intervalo
        }
    });

    // Evento para detectar a seta direita
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" && !DireitaPressionada) {
            DireitaPressionada = true;
            intervaloDireita = setInterval(andarParaDireita, 100); // Executa a cada 100ms
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowRight") {
            DireitaPressionada = false;
            clearInterval(intervaloDireita); // Para o intervalo
        }
    });

    // Evento para detectar a seta cima
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && !CimaPressionada) {
            CimaPressionada = true;
            intervaloCima = setInterval(andarParaCima, 100); // Executa a cada 100ms
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowUp") {
            CimaPressionada = false;
            clearInterval(intervaloCima); // Para o intervalo
        }
    });

    // Evento para detectar a seta baixo
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" && !BaixoPressionada) {
            BaixoPressionada = true;
            intervaloBaixo = setInterval(andarParaBaixo, 100); // Executa a cada 100ms
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowDown") {
            BaixoPressionada = false;
            clearInterval(intervaloBaixo); // Para o intervalo
        }
    });



});