let vida = 10;
let mostraVida = document.querySelector("#mostra-vida");
let invencibleFramesInterval = null; 

function iniciaVerificarDano() {
    invencibleFramesInterval = setInterval(() => {
        const colidiu = detectaColisaoVetor(blocoEl, bloquinhosRandoms);
        
        blocoEl.style.border = `3px solid red`;
        if (colidiu) {
            vida -= 1;
            mostraVida.innerHTML = `Vida: ${vida}`;
            // Quando colidir, pare a verificação de dano
            clearInterval(invencibleFramesInterval);
            
            blocoEl.style.border = `3px solid green`;
            // Pause a verificação por 1 segundo (ou o tempo que preferir)
            setTimeout(() => {
                blocoEl.style.border = `3px solid purple`;
                iniciaVerificarDano();  // Reinicia a verificação de dano após o intervalo
            }, 3000);  // Pausa de 3 segundo
        }
    }, 50);  // Intervalo para verificar a colisão
}

iniciaVerificarDano();  // Inicia a verificação de dano quando o jogo começa


