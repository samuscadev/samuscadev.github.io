let passoX = 7;
let passoY = 4;
let velocidadeAtaque = 8;

function andaDois() {
    let alvo = playerEl.getBoundingClientRect();
    let alvoX = alvo.left;
    let alvoY = alvo.top;

    let posninja = ninjaDois.getBoundingClientRect();
    let posSoldX = posninja.left;
    let posSoldY = posninja.top;

    if (alvoX > posSoldX) {
        posSoldX += passoX;
        ninjaDois.style.transform = `scaleX(-1)`;
    } else if (alvoX < posSoldX) {
        posSoldX -= passoX;
        ninjaDois.style.transform = `scaleX(1)`;
    }

    if (alvoY > posSoldY) {
        posSoldY += passoY;
    } else if (alvoY < posSoldY) {
        posSoldY -= passoY;
    }

    ninjaDois.style.left = `${posSoldX}px`;
    ninjaDois.style.top = `${posSoldY}px`;
}

function andaUm() {
    let alvo = playerEl.getBoundingClientRect();
    let alvoX = alvo.left;
    let alvoY = alvo.top;

    let posninja = ninjaUm.getBoundingClientRect();
    let posSoldX = alvoX * 0.4;
    let posSoldY = alvoY * 0.8;

    ninjaUm.style.left = `${posSoldX}px`;
    ninjaUm.style.top = `${posSoldY}px`;
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
        let posninja = ninjaUm.getBoundingClientRect();
        let alvo = playerEl.getBoundingClientRect();
        atacaUm(posninja.left, posninja.top, alvo.left, alvo.top);
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
}, 6000);

function verificaDanoJogador() {
    if (tomarDano && detectaColisaoVetor(playerEl, document.querySelectorAll('.ataque'))) {
        darDanoJogador();
    }
}

// Verifica colisão a cada 100ms
setInterval(verificaDanoJogador, 100);

ninjaUm.addEventListener('click', (event)=>{
    let mouseX = event.clientX;
    let mouseY = event.clientY - 100;
    if(detectaColisaoUnica(ninjaUm, areaDeAtaqueEl)){
        vidaNinjaUm --;
        textoVidaInimigosEl.style.display = `inline`;
        textoVidaInimigosEl.style.top = `${mouseY}px`;
        textoVidaInimigosEl.style.left = `${mouseX}px`;
        textoVidaInimigosEl.innerHTML = `${vidaNinjaUm}`;
        ninjaUm.style.filter = `contrast(20%) brightness(200%)`;

        setTimeout(()=>{
            ninjaUm.filter = `none`;
            textoVidaInimigosEl.style.display = `none`;
        },100)
    }
    

    if (vidaNinjaUm <= 0) {
        ninjaUm.style.display = "none";
        umAtivo = false;
        ninjaUm.style.filter = `none`;
    }
})

ninjaDois.addEventListener('click', (event)=>{
    let mouseX = event.clientX;
    let mouseY = event.clientY - 100;
    if(detectaColisaoUnica(ninjaDois, areaDeAtaqueEl)){
        vidaNinjaDois --;
        textoVidaInimigosEl.style.display = `inline`;
        textoVidaInimigosEl.style.top = `${mouseY}px`;
        textoVidaInimigosEl.style.left = `${mouseX}px`;
        textoVidaInimigosEl.innerHTML = `${vidaNinjaDois}`;
        ninjaDois.style.filter = `contrast(20%) brightness(200%)`;

        setTimeout(()=>{
            ninjaDois.style.filter = `none`;
            textoVidaInimigosEl.style.display = `none`;
        },100)
    }
    

    if (vidaNinjaDois <= 0) {
        ninjaDois.style.display = "none";
        doisAtivo = false;
        ninjaDois.filter = `none`;
    }
})