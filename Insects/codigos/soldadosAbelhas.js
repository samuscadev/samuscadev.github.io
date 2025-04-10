
let passoX = 7;
let passoY = 4;
let velocidadeAtaque = 8;

function andaDois() {
    let alvo = playerEl.getBoundingClientRect();
    let alvoX = alvo.left;
    let alvoY = alvo.top;

    let posSoldado = soldadoDois.getBoundingClientRect();
    let posSoldX = posSoldado.left;
    let posSoldY = posSoldado.top;

    if (alvoX > posSoldX) {
        posSoldX += passoX;
        soldadoDois.style.transform = `scaleX(-1)`;
    } else if (alvoX < posSoldX) {
        posSoldX -= passoX;
        soldadoDois.style.transform = `scaleX(1)`;
    }

    if (alvoY > posSoldY) {
        posSoldY += passoY;
    } else if (alvoY < posSoldY) {
        posSoldY -= passoY;
    }

    soldadoDois.style.left = `${posSoldX}px`;
    soldadoDois.style.top = `${posSoldY}px`;
}

function andaUm() {
    let alvo = playerEl.getBoundingClientRect();
    let alvoX = alvo.left;
    let alvoY = alvo.top;

    let posSoldado = soldadoUm.getBoundingClientRect();
    let posSoldX = posSoldado.left;
    let posSoldY = posSoldado.top;

    if (alvoX > posSoldX) {
        posSoldX += passoX;
        soldadoUm.style.transform = `scaleX(-1)`;
    } else if (alvoX < posSoldX) {
        posSoldX -= passoX;
        soldadoUm.style.transform = `scaleX(1)`;
    }

    if (alvoY > posSoldY) {
        posSoldY += passoY;
    } else if (alvoY < posSoldY) {
        posSoldY -= passoY;
    }

    soldadoUm.style.left = `${posSoldX}px`;
    soldadoUm.style.top = `${posSoldY}px`;
    atacaUm(posSoldX, posSoldY, alvoX, alvoY);
}

function atacaUm(inicioX, inicioY, alvoX, alvoY) {
    let ataque = document.createElement("div");
    ataque.classList.add("ataque"); // Adicione uma classe para estilizar no CSS
    document.body.appendChild(ataque);

    ataque.style.left = `${inicioX}px`;
    ataque.style.top = `${inicioY}px`;

    let deltaX = alvoX - inicioX;
    let deltaY = alvoY - inicioY;
    let angulo = Math.atan2(deltaY, deltaX);
    
    function moverAtaque() {
        let posAtualX = parseFloat(ataque.style.left);
        let posAtualY = parseFloat(ataque.style.top);

        ataque.style.left = `${posAtualX + Math.cos(angulo) * velocidadeAtaque}px`;
        ataque.style.top = `${posAtualY + Math.sin(angulo) * velocidadeAtaque}px`;

        // Remove o ataque quando sair da tela
        if (posAtualX < 0 || posAtualX > window.innerWidth || posAtualY < 0 || posAtualY > window.innerHeight) {
            ataque.remove();
            clearInterval(intervaloAtaque);
        }
    }

    let intervaloAtaque = setInterval(moverAtaque, 80);
}

setInterval(() => {
    if (umAtivo) {
        let posSoldado = soldadoUm.getBoundingClientRect();
        let alvo = playerEl.getBoundingClientRect();
        atacaUm(posSoldado.left, posSoldado.top, alvo.left, alvo.top);
    }
}, 5000);

setInterval(() => {
    if (doisAtivo) {
        andaDois();
    }
}, 100);

setInterval(() => {
    if (umAtivo) {
        andaUm();
    }
}, 2000);

function verificaDanoJogador() {
    if (tomarDano && detectaColisaoVetor(playerEl, document.querySelectorAll('.ataque'))) {
        darDanoJogador();
    }
}

// Verifica colisão a cada 100ms
setInterval(verificaDanoJogador, 100);

soldadoUm.addEventListener('click', (event)=>{
    let mouseX = event.clientX;
    let mouseY = event.clientY - 100;
    if(detectaColisaoUnica(soldadoUm, areaDeAtaqueEl)){
        vidaSoldadoUm --;
        textoVidaInimigosEl.style.display = `inline`;
        textoVidaInimigosEl.style.top = `${mouseY}px`;
        textoVidaInimigosEl.style.left = `${mouseX}px`;
        textoVidaInimigosEl.innerHTML = `${vidaSoldadoUm}`;
        soldadoUm.style.filter = `contrast(20%) brightness(200%)`;
    }
    setTimeout(()=>{
        soldadoUm.filter = `none`;
        textoVidaInimigosEl.style.display = `none`;
    },100)

    if (vidaSoldadoUm <= 0) {
        soldadoUm.style.display = "none";
        umAtivo = false;
        soldadoUm.filter = `none`;
    }
})

soldadoDois.addEventListener('click', (event)=>{
    let mouseX = event.clientX;
    let mouseY = event.clientY - 100;
    if(detectaColisaoUnica(soldadoDois, areaDeAtaqueEl)){
        vidaSoldadoDois --;
        textoVidaInimigosEl.style.display = `inline`;
        textoVidaInimigosEl.style.top = `${mouseY}px`;
        textoVidaInimigosEl.style.left = `${mouseX}px`;
        textoVidaInimigosEl.innerHTML = `${vidaSoldadoDois}`;
        soldadoDois.style.filter = `contrast(20%) brightness(200%)`;
    }
    setTimeout(()=>{
        soldadoDois.filter = `none`;
        textoVidaInimigosEl.style.display = `none`;
    },100)

    if (vidaSoldadoDois <= 0) {
        soldadoDois.style.display = "none";
        doisAtivo = false;
        soldadoDois.filter = `none`;
    }
})