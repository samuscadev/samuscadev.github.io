document.addEventListener("DOMContentLoaded", function() {
    function iniciarTimerCiclico(duracaoMinutos = 1) {
        let tempoRestante = duracaoMinutos * 60; // Converte minutos para segundos
        const timerEl = document.getElementById('timer'); // Seleciona o elemento do timer

        // Função que atualiza o display do timer a cada segundo
        setInterval(() => {
            const minutosAtual = Math.floor(tempoRestante / 60);
            const segundosAtual = tempoRestante % 60;

            // Formata o tempo como MM:SS
            timerEl.textContent = 
                `${minutosAtual.toString().padStart(2, '0')}:${segundosAtual.toString().padStart(2, '0')}`;

            // Verifica se o tempo acabou e reseta para a duração original
            if (tempoRestante <= 0) {
                tempoRestante = duracaoMinutos * 60; // Reinicia para o tempo inicial (3 minutos)
            } else {
                tempoRestante--; // Diminui o tempo em 1 segundo
            }
        }, 1000); // Define o intervalo de 1 segundo
    }

    // Inicia automaticamente o timer ao carregar a página
    iniciarTimerCiclico();
});
