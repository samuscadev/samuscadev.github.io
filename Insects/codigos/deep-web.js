const playerEl = document.querySelector("#player");
const backgroundEl = document.querySelector("#background");
const spriteplayerEl = document.querySelector("#player img");
const barreiraXR = document.querySelector("#barreira-direita");
const barreiraXL = document.querySelector("#barreira-esquerda");
const barreiraYU = document.querySelector("#barreira-cima");
const barreiraYD = document.querySelector("#barreira-baixo");
const menuStatusEl = document.querySelector("#container");
const menuEstatisticas = document.querySelector("#telaVitoria");
const pilarEl = document.querySelector("#pilar");
const hitBoxEl = document.querySelector("#hit-box");
const areaDeAtaqueEl = document.querySelector("#area-Ataque");
const bodyEl = document.querySelector("body");
const bigBau = document.querySelector("#big-bau");
const trilhaSonora = document.getElementById("backsound-fase");
const somTiro = document.getElementById("tiro-effect");
const somResetar = document.getElementById("reset-sound");
const somDano = document.getElementById("damage-sound");
function tocarMusica() {
    trilhaSonora.volume = 0.9;
    trilhaSonora.play();
}
function somReset() {
    somResetar.volume = 0.2;
    somResetar.play();
}
function somTomarDano() {
    somDano.play();
}
function somAtirar() {
    somTiro.currentTime = 0;
    somTiro.play();
}

let progresso = 0;
function atualizarProgresso(soma) {
    soma *= 0.65; // SOMA SÓ PODE OPERAR COM MULTIPLICAÇÃO OU DIVISÃO
    if (progresso < 300) {
        progresso += soma; 
        document.getElementById("progresso").style.width = progresso + "px";
    }
}

function deletarIntervalos(){
    let highestId = setInterval(() => {}, 0); // Obtém o ID mais alto de setInterval
        for (let i = 0; i <= highestId; i++) {
            clearInterval(i); // Limpa todos os intervalos até o ID mais alto
        }
}

let posX = 0;
let posY = 0;
let intervalID = null;
let animacaoCorrer = null;
let animacaoDescer = null;
let animacaoSubir = null;
let indiceCorrida = 0;
let indiceSubida = 0;
let indiceDescida = 0;

let vidasJogador = localStorage.getItem("vidaPlayer");
let jogadorVivo = true;

setInterval(function(){
    if(detectaColisaoUnica(hitBoxEl, barreiraXR)){
        posX -= 15;
        playerEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(1)`;
    }
    if(detectaColisaoUnica(hitBoxEl, barreiraXL)){
        posX += 15; 
        playerEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(-1)`;    
    }
    if(detectaColisaoUnica(hitBoxEl, barreiraYU)){
        posY += 15;
        playerEl.style.transform = `translate(${posX}px, ${posY}px)`;
    }
    if(detectaColisaoUnica(playerEl, barreiraYD)){
        posY -= 15;
        playerEl.style.transform = `translate(${posX}px, ${posY}px)`;
    }
}
, 50);

let cavalosRun = [
    "assets/DeepWeb/deep-horse.svg",
    "assets/DeepWeb/deep-horse2.svg",
];
let happyRun = [
    "assets/DeepWeb/deep-happy-bugs.svg",
    "assets/DeepWeb/deep-happy-bugs2.svg",
];

let spritesChao = [
    "assets/DeepWeb/deep-floor.svg",
    "assets/DeepWeb/deep-floor2.svg",
    "assets/DeepWeb/deep-floor3.svg",
    "assets/DeepWeb/deep-floor4.svg",
];
let podeAnimarChao = true;
let indiceChao = 0;

function animaChao() {
    if(podeAnimarChao){
        bodyEl.style.backgroundImage = `url(${spritesChao[indiceChao]})`;
        indiceChao = (indiceChao + 1) % spritesChao.length;
    }
}
setInterval(animaChao, 500);

function andar(deltaX, deltaY) {
        posX += deltaX * 10;
        posY += deltaY * 10;

        if (deltaX == 1) {
            playerEl.style.transform = "scaleX(1)";
        } else if (deltaX == -1) {
            playerEl.style.transform = "scaleX(-1)";
        }
        
        areaDeAtaqueEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(${deltaX < 0 ? -1 : 1})`;
        playerEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(${deltaX < 0 ? -1 : 1})`;
}

function animarCorrida() {
    spriteplayerEl.src = protagonistaRun[indiceCorrida];
    indiceCorrida = (indiceCorrida + 1) % protagonistaRun.length;
}
function animarDescida() {
    spriteplayerEl.src = protagonistaDownRun[indiceDescida];
    indiceDescida = (indiceDescida + 1) % protagonistaDownRun.length;
}
function animarSubida() {
    spriteplayerEl.src = protagonistaUpRun[indiceSubida];
    indiceSubida = (indiceSubida + 1) % protagonistaUpRun.length;
}

function encerrarDungeon(){
    clearInterval(tempoCorrendo);
    let intervaloFinal = setInterval(()=>{
        if(detectaColisaoUnica(hitBoxEl, bigBau)){
            bigBau.style.width = '140px';
            bigBau.style.height = '160px';
            bigBau.src = "assets/big-bau-dirty-aberto.svg";
            setTimeout(()=>{
                menuEstatisticas.style.display = 'flex';
                setTimeout(()=>{
                    document.querySelectorAll("#telaVitoria p").forEach(texto => {
                        texto.style.backgroundColor = "white";
                    });
                }, 1000);
                setTimeout(()=>{
                    document.querySelectorAll("#telaVitoria p").forEach(texto => {
                        texto.style.removeProperty("background-color");
                        cauculaScore();
                        menuEstatisticas.innerHTML = `
                                                    <p>Você Coletou A Brisa Encardida</p>
                                                    <p>Estatísticas:</p>
                                                    <p>Perdeu ${atrVidaPerdida} de vida</p>
                                                    <p>${atrBausAbertos} Baús Abertos</p>
                                                    <p>${atrInimigosDerrotados} Inimigos Derrotados</p>
                                                    <p>${minutos} Minutos</p>
                                                    <p>${segundos} Segundos</p>
                                                    <p id="rank">${scorebasico}</p>
                                                    <button>Continuar</button>
                                                `;
                    });
                    clearInterval(intervaloFinal);
                    intervaloFinal = null;
                }, 1500);
            }, 1000);
        }
    }, 1000); 
};

document.addEventListener("keydown", (event) => {
    tocarMusica();
    if (intervalID || !jogadorVivo) return; // Evita múltiplos intervals para movimento

    switch (event.key) {
        case "ArrowRight":
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 100); // Troca os sprites a cada 200ms
            intervalID = setInterval(() => andar(1, 0), 50);
            break;
        case "ArrowLeft":
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 100);
            intervalID = setInterval(() => andar(-1, 0), 50);
            break;
        case "ArrowUp":
            if (!animacaoSubir) animacaoSubir = setInterval(animarSubida, 100);
            intervalID = setInterval(() => andar(0, -1), 50);
            break;
        case "ArrowDown":
            if (!animacaoDescer) animacaoDescer = setInterval(animarDescida, 100);
            intervalID = setInterval(() => andar(0, 1), 50);
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (!jogadorVivo) return;
    if(
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
    ) {
        clearInterval(animacaoCorrer);
        animacaoCorrer = null;
        clearInterval(animacaoSubir);
        animacaoSubir = null;
        clearInterval(animacaoDescer);
        animacaoDescer = null;
        spriteplayerEl.src = "assets/Protagonista/protagonista-comtemplativo.svg";
        clearInterval(intervalID); // Para o movimento geral
        intervalID = null;
    }
    indiceCorrida = 0;
    indiceDescida = 0;
});

let itemWidth = 100;
let itemHeight = 80;
let margem = 140;
const campoGararBaus = document.querySelector("#campo-baus");
const campoGararPedras = document.querySelector("#campo-sujeiras");
const campoGararInimigos = document.querySelector("#campo-inimigos");
const campoGararBarreiras = document.querySelector("#campo-armadilhas");
const campoCoracoes = document.querySelector("#coracoes");
let inimigos = [];
let happyBugs = [];
let happyBugsVida = [];
let vetorSujeiras = [];
let baus = [];
let armadilhas = [];
let coracoes = [];
let inimigosVida = [];
let bausBrisa = [];
let quantBrisasColetadas = 0;
let salaAtual = 1;


for(let i=0; i < vidasJogador; i++){
    const novoCoracao = document.createElement("img");
    coracoes.push(novoCoracao);
    novoCoracao.classList.add("icone-coracao");
    novoCoracao.src = "assets/heart-icon.svg";
    campoCoracoes.appendChild(novoCoracao);
}

let tomarDano = true;
function darDanoJogador(){
    coracoes[0].remove();
    coracoes.splice(0, 1);
    atrVidaPerdida ++;
    vidasJogador --;
    tomarDano = false;
    somTomarDano();
    playerEl.classList.add('piscando');
        setTimeout(()=>{
            playerEl.classList.remove('piscando');
            tomarDano = true;
    }, 2500);
}

const idSalaAtualEl = document.querySelector("#sala-Atual");
const mostradorBrisasColetadas = document.querySelector("#mostra-Brisa");
let todosBausAbertos = false;


function verificaPosicaoLivre(x, y, itensExistentes) {
    for (let item of itensExistentes) {
        const rect = item.getBoundingClientRect();
        if (x < rect.left + rect.width && x + itemWidth > rect.left && y < rect.top + rect.height && y + itemHeight > rect.top) {
            return false; // Há colisão com outro item
        }
    }
    return true; // A posição está livre
}
function atirar(evento) {
    // Posição do jogador
    const jogadorRect = playerEl.getBoundingClientRect();
    const jogadorX = jogadorRect.left + jogadorRect.width / 2;
    const jogadorY = jogadorRect.top + jogadorRect.height / 2;

    // Posição do clique
    const destinoX = evento.clientX;
    const destinoY = evento.clientY;

    // Criar o projétil
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");
    document.body.appendChild(projetil);

    // Definir posição inicial do tiro (onde está o jogador)
    projetil.style.left = `${jogadorX + 10}px`;
    projetil.style.top = `${jogadorY + 10}px`;

    const deltaX = destinoX - jogadorX;
    const deltaY = destinoY - jogadorY;
    const angulo = Math.atan2(deltaY, deltaX);

    const velocidade = 8;
    const velocidadeX = Math.cos(angulo) * velocidade;
    const velocidadeY = Math.sin(angulo) * velocidade;

    function moverProjetil() {
        const xAtual = parseFloat(projetil.style.left);
        const yAtual = parseFloat(projetil.style.top);

        projetil.style.left = `${xAtual + velocidadeX}px`;
        projetil.style.top = `${yAtual + velocidadeY}px`;

        if (
            xAtual < 0 || xAtual > window.innerWidth ||
            yAtual < 0 || yAtual > window.innerHeight
        ) {
            projetil.remove();
        } else {
            requestAnimationFrame(moverProjetil);
        }

        setTimeout(() => {
            projetil.style.width = "30px";
        }, 350);
        setTimeout(() => {
            projetil.remove();
        }, 500);
        
    }
    requestAnimationFrame(moverProjetil);
}
document.addEventListener("click", (event)=>{
    if(jogadorVivo){
        atirar(event);
        somAtirar();
    }   
});

let textoVidaInimigosEl = document.querySelector("#vida-inimigo");
// Função para gerar inimigos, baús e armadilhas
function gerarCoisas() {
    const limiteBaus = Math.floor(Math.random() * 2) + 1;
    const limiteInimigos = Math.floor(Math.random() * 2) + 1;
    const limiteHappyBugs = Math.floor(Math.random() * 3);
    const limiteBarreiras = Math.floor(Math.random() * 2) + 2;
    const limiteSujeira = Math.floor(Math.random() * 5) + 2;
    // Lista de itens existentes para verificar colisões
    let itensExistentes = [];

    // Gera baús
    for (let i = 0; i < limiteBaus; i++) {
        const novoBau = document.createElement("img");
        novoBau.classList.add("bau");
        novoBau.src = 'assets/DeepWeb/bau-deep-fechado.svg';
        novoBau.style.position = 'absolute';

        // Encontra posição livre para o baú
        let posicaoValida = false;
        let x, y;
        while (!posicaoValida) {
            x = Math.random() * (window.innerWidth - 2 * margem - itemWidth) + margem;
            y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
            posicaoValida = verificaPosicaoLivre(x, y, itensExistentes);
        }

        novoBau.style.top = `${y}px`;
        novoBau.style.left = `${x}px`;
        campoGararBaus.appendChild(novoBau);
        baus.push(novoBau);
        bausBrisa.push(15);
        itensExistentes.push(novoBau);
    }

    // Gera ARMADILHAS
    for (let i = 0; i < limiteBarreiras; i++) {
        const novaBarreira = document.createElement("img");
        novaBarreira.classList.add("armadilha");
        novaBarreira.src = 'assets/DeepWeb/deep-red-bugs.svg';
        novaBarreira.style.position = 'absolute';
        let armadilhaDirecao = Math.floor(Math.random() *2);

        // Encontra posição livre para a barreira
        let posicaoValida = false;
        let x, y;
        while (!posicaoValida) {
            x = Math.random() * (window.innerWidth - 2 * margem - itemWidth) + margem;
            y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
            posicaoValida = verificaPosicaoLivre(x, y, itensExistentes);
        }
        if(armadilhaDirecao == 0){
            novaBarreira.style.transform = 'scaleX(1)';
        }
        if(armadilhaDirecao == 1){
            novaBarreira.style.transform = 'scaleX(-1)';
        }
        novaBarreira.style.top = `${y}px`;
        novaBarreira.style.left = `${x}px`;
        campoGararBarreiras.appendChild(novaBarreira);
        armadilhas.push(novaBarreira);
        itensExistentes.push(novaBarreira);
    }

    // Gera inimigos
    for (let i = 0; i < limiteInimigos; i++) {
        const novoInimigo = document.createElement("img");
        novoInimigo.classList.add("inimigo");
        novoInimigo.src = 'assets/DeepWeb/deep-horse.svg';
        novoInimigo.style.position = 'absolute';
        
        // Encontra posição livre para o inimigo
        let x, y;
        x = window.innerWidth  - (margem * 2);
        y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
        
        novoInimigo.style.top = `${y}px`;
        novoInimigo.style.left = `${x}px`;
        campoGararInimigos.appendChild(novoInimigo);
        inimigos.push(novoInimigo);
        inimigosVida.push(10);

        // Adiciona evento ao inimigo
        novoInimigo.addEventListener("click", (event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY - 100;
            if(detectaColisaoUnica(novoInimigo, areaDeAtaqueEl)){
                const index = inimigos.indexOf(novoInimigo);
                inimigosVida[index]--;
                textoVidaInimigosEl.style.display = `inline`;
                textoVidaInimigosEl.style.top = `${mouseY}px`;
                textoVidaInimigosEl.style.left = `${mouseX}px`;
                textoVidaInimigosEl.innerHTML = `${inimigosVida[index]}`;
                novoInimigo.style.filter = `contrast(20%) brightness(200%)`;
                setTimeout(()=>{
                    novoInimigo.style.filter = `contrast(100%) brightness(100%)`;
                    textoVidaInimigosEl.style.display = `none`;
                },100)
            
                if (inimigosVida[index] <= 0) {
                    novoInimigo.remove();
                    atrInimigosDerrotados ++;
                    atualizarProgresso(10);
                    inimigos.splice(index, 1);
                    inimigosVida.splice(index, 1);
                }
            }  
        });
    }

    for (let i = 0; i < limiteHappyBugs; i++) {
        const novoHappyBug = document.createElement("img");
        novoHappyBug.classList.add("happy-Bug");
        novoHappyBug.src = 'assets/DeepWeb/deep-happy-bugs.svg';
        novoHappyBug.style.position = 'absolute';
        let x, y;
        x = window.innerWidth  - 185;
        y = Math.random() * (window.innerHeight - 2 * margem - 85) + margem;
        
        novoHappyBug.style.top = `${y}px`;
        novoHappyBug.style.left = `${x}px`;
        campoGararInimigos.appendChild(novoHappyBug);
        happyBugs.push(novoHappyBug);
        happyBugsVida.push(8);

        novoHappyBug.addEventListener("click", (event) => {
            let mouseX = event.clientX;
            let mouseY = event.clientY - 100;
            if(detectaColisaoUnica(novoHappyBug, areaDeAtaqueEl)){
                const index = happyBugs.indexOf(novoHappyBug);
                happyBugsVida[index]--;
                textoVidaInimigosEl.style.display = `inline`;
                textoVidaInimigosEl.style.top = `${mouseY}px`;
                textoVidaInimigosEl.style.left = `${mouseX}px`;
                textoVidaInimigosEl.innerHTML = `${happyBugsVida[index]}`;
                novoHappyBug.style.filter = `contrast(20%) brightness(200%)`;
                setTimeout(()=>{
                    novoHappyBug.style.filter = `contrast(100%) brightness(100%)`;
                    textoVidaInimigosEl.style.display = `none`;
                },100)
            
                if (happyBugsVida[index] <= 0) {
                    novoHappyBug.remove();
                    atrInimigosDerrotados ++;
                    atualizarProgresso(10);
                    happyBugs.splice(index, 1);
                    happyBugsVida.splice(index, 1);
                }
            }  
        });
    }

    //GERA PEDRAS/SUJEIRAS
    for (let i = 0; i < limiteSujeira; i++) {
        const novaSujeira = document.createElement("img");
        novaSujeira.classList.add("sujeira");
        vetorSujeiras.push(novaSujeira);
        novaSujeira.src = 'assets/DeepWeb/deep-rocks.svg';
        novaSujeira.style.position = 'absolute';
        let pedraDirecao = Math.floor(Math.random() *2);

        // Encontra posição livre para a barreira
        let posicaoValida = false;
        let x, y;
        while (!posicaoValida) {
            x = Math.random() * (window.innerWidth - 2 * margem - itemWidth) + margem;
            y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
            posicaoValida = verificaPosicaoLivre(x, y, itensExistentes);
        }

        if(pedraDirecao == 0){
            novaSujeira.style.transform = 'scaleX(1)';
        }
        if(pedraDirecao == 1){
            novaSujeira.style.transform = 'scaleX(-1)';
            novaSujeira.style.filter = 'brightness(50%)';
        }
        novaSujeira.style.top = `${y}px`;
        novaSujeira.style.left = `${x}px`;
        campoGararPedras.appendChild(novaSujeira);
        itensExistentes.push(novaSujeira);
    }
}


const sujeiras = document.querySelectorAll(".sujeira");
// Função para reiniciar sala ao clicar no pilar
document.querySelector("#pilar").addEventListener("click", () => {
    if(todosBausAbertos){
        // Remove inimigos e baús da sala atual
        somReset();
        document.querySelector("#pilar").style.display = `none`;
        inimigos.forEach((inimigo) => inimigo.remove());
        vetorSujeiras.forEach((sujeira) => sujeira.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        happyBugs.forEach((happy) => happy.remove());
        // Limpa arrays e reseta estados
        inimigos = [];
        happyBugs = [];
        happyBugsVida = [];
        baus = [];
        inimigosVida = [];
        bausBrisa = [];
        bodyEl.style.backgroundImage = `linear-gradient(#178f2d, #0d4115)`;
        posX = 0;
        posY = 30;
        playerEl.style.display = `none`;
        playerEl.style.top = `${posY}px`;
        playerEl.style.left = `${posX}px`;
        tomarDano = false;

        // Atualiza contador de salas e regenera os elementos após 1 segundo
        setTimeout(() => {
            bodyEl.style.backgroundImage = `url("assets/DeepWeb/deep-floor.svg")`;
            gerarCoisas();
            areaDeAtaqueEl.style.transform = `translate(0px, 0px)`;
            playerEl.style.display = `block`;
            document.querySelector("#pilar").style.display = `block`;
        }, 250);
        todosBausAbertos = false;

        setTimeout(()=>{
            tomarDano = true;
        }, 5000)
    }
});

// Atualiza posição de inimigos e verifica colisão
let direcaoInimigos = -8;
let cosHappy = 0;

let intervalosDiversos = setInterval(() => {
    let colisaoComBarreiraDireita = false;
    let colisaoComBarreiraEsquerda = false;

    inimigos.forEach((inimigo) => {
        if (detectaColisaoUnica(inimigo, barreiraXR)) {
            colisaoComBarreiraDireita = true;
        } else if (detectaColisaoUnica(inimigo, barreiraXL)) {
            colisaoComBarreiraEsquerda = true;
        }
    });
    inimigos.forEach((inimigo) => {
        if(detectaColisaoUnica(inimigo, areaDeAtaqueEl)){
            inimigo.classList.add("specialcursor");
        }
        else{
            inimigo.classList.remove("specialcursor");
        }
    });
    if (colisaoComBarreiraDireita) {
        direcaoInimigos = -8;
        inimigos.forEach((inimigo) => {
            inimigo.style.transform = "scaleX(1)";
        });
    } else if (colisaoComBarreiraEsquerda) {
        direcaoInimigos = 8;
        inimigos.forEach((inimigo) => {
            inimigo.style.transform = "scaleX(-1)";
        });
    }

    inimigos.forEach((inimigo) => {
        const leftComputado = parseInt(window.getComputedStyle(inimigo).left, 10);
        const novoLeft = leftComputado + direcaoInimigos;
        inimigo.style.left = `${novoLeft}px`;
    });

    inimigos.forEach((inimigo) => {
        if (detectaColisaoUnica(hitBoxEl, inimigo) && tomarDano) {
            darDanoJogador();
        }
    });
    happyBugs.forEach((inimigo) => {
        if (detectaColisaoUnica(hitBoxEl, inimigo) && tomarDano) {
            darDanoJogador();
        }
    });
    armadilhas.forEach((armadilha) => {
        if (detectaColisaoUnica(hitBoxEl, armadilha) && tomarDano) {
            darDanoJogador();
        }
    });

    baus.forEach((bau, i) => {
        if (detectaColisaoUnica(bau, playerEl)) {
            bau.src = 'assets/DeepWeb/bau-deep-aberto.svg';  
            atualizarProgresso(bausBrisa[i]);
            if(bausBrisa[i] != 0){
                atrBausAbertos ++;
            }
            bausBrisa[i] = 0;
        }
    });

    const todosZero = bausBrisa.every(elemento => elemento === 0);
    if(todosZero){
        document.querySelector("#pilar img").src ="assets/DeepWeb/deep-pilar-ligado.svg";
        todosBausAbertos = true;
    }
    else{
        document.querySelector("#pilar img").src ="assets/DeepWeb/deep-pilar.svg";
        todosBausAbertos = false;
    }

    //JOGADOR COLETA TODAS AS BRISAS
    if(progresso >= 300){
        tomarDano = false;
        bigBau.style.display = `block`;
        menuStatusEl.style.display = 'none';
        document.querySelector("#pilar").style.display = `none`;
        inimigos.forEach((inimigo) => inimigo.remove());
        vetorSujeiras.forEach((sujeira) => sujeira.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        happyBugs.forEach((happy) => happy.remove());

        inimigos = [];
        happyBugs = [];
        happyBugsVida = [];
        vetorSujeiras = [];
        baus = [];
        inimigosVida = [];
        bausBrisa = [];

        encerrarDungeon();
        clearInterval(intervalosDiversos);
    }
}, 50);

let direcaoHappy = -120;
let intervaloHappy = setInterval(() => {
    happyBugs.forEach((inimigo) => {
        // Inicializa o valorCos individual para cada inimigo, se ainda não existir
        if (!inimigo.dataset.valorCosHappy) {
            inimigo.dataset.valorCosHappy = '0';
        }

        let topComputado = parseInt(window.getComputedStyle(inimigo).top, 10);
        let leftComputado = parseInt(window.getComputedStyle(inimigo).left, 10);

        let valorCosHappy = parseFloat(inimigo.dataset.valorCosHappy);
        
        // Movimento horizontal
        let novoLeft = leftComputado + direcaoHappy;

        // Movimento de flutuação
        let amplitude = window.innerHeight * 0.1; // Altura da flutuação
        let novoTop = topComputado + Math.cos(valorCosHappy) * amplitude;

        // Incrementa o valor do coseno para o próximo frame
        valorCosHappy += 0.1;

        // Reinicia o ciclo do cosseno para evitar valores muito grandes
        if (valorCosHappy >= 2 * Math.PI) {
            valorCosHappy = 0;
        }

        // Verifica colisão com barreiras
        if (detectaColisaoUnica(inimigo, barreiraXL)) {
            direcaoHappy *= -1;
            novoLeft = leftComputado + 86;
            inimigo.style.transform = 'scaleX(1)';
        }
        if (detectaColisaoUnica(inimigo, barreiraXR)) {
            direcaoHappy *= -1;
            novoLeft = leftComputado - 86;
            inimigo.style.transform = 'scaleX(-1)';
        }

        // Atualiza a posição do inimigo
        inimigo.style.left = `${novoLeft}px`;
        inimigo.style.top = `${novoTop}px`;

        // Salva o valorCos atualizado no dataset do inimigo
        inimigo.dataset.valorCosHappy = valorCosHappy.toString();
    });
}, 100);


let indAnimEn = 0;
setInterval(() => {

    inimigos.forEach((inimigo) => {
        inimigo.src = cavalosRun[indAnimEn];
    });

    happyBugs.forEach((inimigo) => {
        inimigo.src = happyRun[indAnimEn];
    });
    indAnimEn = indAnimEn === 0 ? 1 : 0; 
}, 225);

gerarCoisas();
console.log(bausBrisa);

//DETECTA MORTE
let morte = setInterval(()=>{
    if(vidasJogador == 0){
        tomarDano = false;
        jogadorVivo = false;
        document.querySelector("#pilar").style.display = `none`;
        inimigos.forEach((inimigo) => inimigo.remove());
        vetorSujeiras.forEach((sujeira) => sujeira.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        happyBugs.forEach((happy) => happy.remove());

        inimigos = [];
        happyBugs = [];
        happyBugsVida = [];
        vetorSujeiras = [];
        baus = [];
        inimigosVida = [];
        bausBrisa = [];
        
        bodyEl.style.backgroundImage = `url("assets/died-background.svg")`;
        menuStatusEl.style.display = 'none';
        document.querySelectorAll(".bolha").forEach(bolha => {
            bolha.style.backgroundColor = "red";
        });
        spriteplayerEl.style.width = '180px';
        spriteplayerEl.style.height = '110px';
        spriteplayerEl.src = "assets/Protagonista/protagonista-died.svg",
        document.querySelector("#telaMorte").style.display = 'flex';
        document.querySelector("#barreira-esquerda").style.display = 'none';
        document.querySelector("#barreira-direita").style.display = 'none';
        document.querySelector("#barreira-cima").style.display = 'none';
        document.querySelector("#barreira-baixo").style.display = 'none';
        document.querySelector("#sombras").style.display = 'none';
        playerEl.classList.remove('piscando');

        setTimeout(deletarIntervalos, 1000);
    }
}, 1000);






