document.addEventListener("DOMContentLoaded", function () {
    
    const marEl = document.querySelector('main');
    const bolhaEl = document.querySelector('#bolha');

    function atualizaMar(){
        setInterval(() => {
            marEl.style.backgroundColor = "rgb(17, 26, 114)";
        }, 1000);
        setInterval(() => {
            marEl.style.backgroundColor = "rgb(14, 23, 97)";
        }, 5000);
        setInterval(() => {
            marEl.style.backgroundColor = "rgb(13, 19, 65)";
        }, 10000);
        setInterval(() => {
            marEl.style.backgroundColor = "rgb(7, 9, 31)";
        }, 1400);
        setInterval(() => {
            marEl.style.backgroundColor = "rgb(13, 15, 43)";
        }, 17000);
    }

    function iniciarCicloMar() {
        const intervalo = 5000; // Atualização a cada 5 segundos
        const duracaoCiclo = 20000; // 20 segundos de ciclo
    
        const intervalID = setInterval(atualizaMar, intervalo);
    
        // Parar o ciclo após 20 segundos
        setTimeout(() => {
            clearInterval(intervalID);
            console.log("Ciclo concluído. Reiniciando em breve...");
            iniciarCicloMar(); // Reinicia o ciclo
        }, duracaoCiclo);
    }
    
    // Iniciar o primeiro ciclo
    iniciarCicloMar();


    function criarBolha() {
        // Clonar a bolha original
        const novaBolha = bolhaEl.cloneNode(true);
        novaBolha.style.display = "block"; // Exibir a bolha clonada
        novaBolha.style.left = `${Math.random() * window.innerWidth}px`; // Posição aleatória no eixo X
        novaBolha.style.bottom = `0px`; // Começa no fundo da tela
        novaBolha.style.animationDuration = `${Math.random() * 6 + 2}s`; // Duração aleatória entre 2s e 4s
    
        // Adicionar ao corpo da página
        document.body.appendChild(novaBolha);
    
        // Remover a bolha após a animação
        novaBolha.addEventListener("animationend", () => {
            novaBolha.remove();
        });
    }
    
    // Criar bolhas em intervalos regulares
    setInterval(criarBolha, 500);
});