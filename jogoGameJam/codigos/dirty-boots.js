const playerEl = document.querySelector("#player");
const backgroundEl = document.querySelector("#background");
const spriteplayerEl = document.querySelector("#player img");
const barreiraXR = document.querySelector("#barreira-direita");
const barreiraXL = document.querySelector("#barreira-esquerda");
const barreiraYU = document.querySelector("#barreira-cima");
const barreiraYD = document.querySelector("#barreira-baixo");
const abrirMenuEl = document.querySelector("#abrirStatus");
const menuStatusEl = document.querySelector("#container");
const pilarEl = document.querySelector("#pilar");
const hitBoxEl = document.querySelector("#hit-box");
const areaDeAtaqueEl = document.querySelector("#area-Ataque");
const bodyEl = document.querySelector("body");

const trilhaSonora = document.getElementById("backsound-fase");
const somTiro = document.getElementById("tiro-effect");
const somResetar = document.getElementById("reset-sound");
const somDano = document.getElementById("damage-sound");
function tocarMusica() {
    trilhaSonora.volume = 0.6;
    trilhaSonora.play();
}
function somReset() {
    somResetar.volume = 0.7;
    somResetar.play();
}
function somTomarDano() {
    somDano.play();
}
function somAtirar() {
    somTiro.currentTime = 0;
    somTiro.play();

    setTimeout(() => {
        musica.pause();
        musica.currentTime = 0;
    }, 1000);
}
let progresso = 0;
function atualizarProgresso(soma) {
    soma /= 2;
    if (progresso < 300) {
        progresso += soma; 
        document.getElementById("progresso").style.width = progresso + "px";
    }
}

abrirMenuEl.addEventListener('click', function(){

    if (menuStatusEl.style.visibility === "hidden") {
        menuStatusEl.style.visibility = "visible";
    } else {
        menuStatusEl.style.visibility = "hidden";
    }
})

let posX = 0;
let posY = 0;
let intervalID = null;
let animacaoCorrer = null;
let indiceCorrida = 0;

setInterval(function(){
    if(detectaColisaoUnica(playerEl, barreiraXR)){
        posX -= 15;
        playerEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(1)`;
    }
    if(detectaColisaoUnica(playerEl, barreiraXL)){
        posX += 15; 
        playerEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(-1)`;    
    }
    if(detectaColisaoUnica(playerEl, barreiraYU)){
        posY += 15;
        playerEl.style.transform = `translate(${posX}px, ${posY}px)`;
    }
    if(detectaColisaoUnica(playerEl, barreiraYD)){
        posY -= 15;
        playerEl.style.transform = `translate(${posX}px, ${posY}px)`;
    }
}
, 50)

let protagonistaRun = [
    "assets/protagonista-run1.png",
    "assets/protagonista-run2.png",
    "assets/protagonista-run3.png",
    "assets/protagonista-run4.png",
];
let inimigosRun = [
    "assets/ant-enados1.png",
    "assets/ant-enados2.png",
];


function andar(deltaX, deltaY) {
        posX += deltaX * 10;
        posY += deltaY * 10;

        if (deltaX == 1) {
            playerEl.style.transform = "scaleX(1)";
        } else if (deltaX == -1) {
            playerEl.style.transform = "scaleX(-1)";
        }
        if (deltaY == -1) {
            spriteplayerEl.src = "assets/protagonista-virado-atras.png";
        }
        if (deltaY == 1) {
            spriteplayerEl.src = "assets/protagonista-virado-frente.png";
        }
        areaDeAtaqueEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(${deltaX < 0 ? -1 : 1})`;
        playerEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(${deltaX < 0 ? -1 : 1})`;
}

function animarCorrida() {
    spriteplayerEl.src = protagonistaRun[indiceCorrida];
    indiceCorrida = (indiceCorrida + 1) % protagonistaRun.length; // Cicla os índices
}

document.addEventListener("keydown", (event) => {
    tocarMusica();
    if (intervalID) return; // Evita múltiplos intervals para movimento

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
            intervalID = setInterval(() => andar(0, -1), 50);
            spriteplayerEl.src = "assets/protagonista-virado-atras.png";
            break;
        case "ArrowDown":
            intervalID = setInterval(() => andar(0, 1), 50);
            spriteplayerEl.src = "assets/protagonista-virado-frente.png";
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if(
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
    ) {
        clearInterval(animacaoCorrer); // Para a animação horizontal
        animacaoCorrer = null;
        spriteplayerEl.src = "assets/protagonista.png";
        clearInterval(intervalID); // Para o movimento geral
        intervalID = null;
    }
    indiceCorrida = 0;
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
let baus = [];
let armadilhas = [];
let coracoes = [];
let inimigosVida = [];
let bausBrisa = [];
let quantBrisasColetadas = 0;
let salaAtual = 1;

for(let i=0; i<6; i++){
    const novoCoracao = document.createElement("img");
    coracoes.push(novoCoracao);
    novoCoracao.classList.add("icone-coracao");
    novoCoracao.src = "assets/heart-icon.png";
    campoCoracoes.appendChild(novoCoracao);
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
    projetil.style.left = `${jogadorX}px`;
    projetil.style.top = `${jogadorY}px`;

    // Calcular ângulo do tiro
    const deltaX = destinoX - jogadorX;
    const deltaY = destinoY - jogadorY;
    const angulo = Math.atan2(deltaY, deltaX);

    // Velocidade do projétil
    const velocidade = 8; // Pixels por frame
    const velocidadeX = Math.cos(angulo) * velocidade;
    const velocidadeY = Math.sin(angulo) * velocidade;

    // Função de animação
    function moverProjetil() {
        const xAtual = parseFloat(projetil.style.left);
        const yAtual = parseFloat(projetil.style.top);

        // Atualizar posição
        projetil.style.left = `${xAtual + velocidadeX}px`;
        projetil.style.top = `${yAtual + velocidadeY}px`;

        // Remover o projétil se sair da tela
        if (
            xAtual < 0 || xAtual > window.innerWidth ||
            yAtual < 0 || yAtual > window.innerHeight
        ) {
            projetil.remove();
        } else {
            requestAnimationFrame(moverProjetil);
        }

        setTimeout(() => {
            projetil.style.backgroundImage = "linear-gradient(to left, #ffffff, #ffffff)";
            projetil.style.width = "30px";
        }, 400);
        setTimeout(() => {
            projetil.remove();
        }, 500);
        
    }
    requestAnimationFrame(moverProjetil);
}
document.addEventListener("click", (event)=>{
    atirar(event);
    somAtirar();
});

let textoVidaInimigosEl = document.querySelector("#vida-inimigo");
// Função para gerar inimigos, baús e armadilhas
function gerarCoisas() {
    const limiteBaus = Math.floor(Math.random() * 2) + 1;
    const limiteInimigos = Math.floor(Math.random() * 3) + 2;
    const limiteBarreiras = Math.floor(Math.random() * 2) + 2;
    const limiteSujeira = Math.floor(Math.random() * 8) + 4;
    // Lista de itens existentes para verificar colisões
    let itensExistentes = [];

    // Gera baús
    for (let i = 0; i < limiteBaus; i++) {
        const novoBau = document.createElement("img");
        novoBau.classList.add("bau");
        novoBau.src = 'assets/bau-fechado.png';
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
        bausBrisa.push(25);
        itensExistentes.push(novoBau);
    }

    // Gera barreiras
    for (let i = 0; i < limiteBarreiras; i++) {
        const novaBarreira = document.createElement("img");
        novaBarreira.classList.add("armadilha");
        novaBarreira.src = 'assets/armadilha-dirty-boots.png';
        novaBarreira.style.position = 'absolute';

        // Encontra posição livre para a barreira
        let posicaoValida = false;
        let x, y;
        while (!posicaoValida) {
            x = Math.random() * (window.innerWidth - 2 * margem - itemWidth) + margem;
            y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
            posicaoValida = verificaPosicaoLivre(x, y, itensExistentes);
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
        novoInimigo.src = 'assets/ant-enados1-copy.png';
        novoInimigo.style.position = 'absolute';

        // Encontra posição livre para o inimigo
        let posicaoValida = false;
        let x, y;
        while (!posicaoValida) {
            x = Math.random() * (window.innerWidth - 2 * margem - itemWidth) + margem;
            y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
            posicaoValida = verificaPosicaoLivre(x, y, itensExistentes);
        }

        novoInimigo.style.top = `${y}px`;
        novoInimigo.style.left = `${x}px`;
        campoGararInimigos.appendChild(novoInimigo);
        inimigos.push(novoInimigo);
        inimigosVida.push(10);
        itensExistentes.push(novoInimigo);

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
                novoInimigo.style.filter = `contrast(20%) brightness(200%) blur(2px)`;
                setTimeout(()=>{
                    novoInimigo.style.filter = `contrast(100%) brightness(100%) blur(0px)`;
                    textoVidaInimigosEl.style.display = `none`;
                },100)
            
                if (inimigosVida[index] <= 0) {
                    novoInimigo.remove();
                    atualizarProgresso(10);
                    inimigos.splice(index, 1);
                    inimigosVida.splice(index, 1);
                }
            }  
        });
    }

    for (let i = 0; i < limiteSujeira; i++) {
        const novaSujeira = document.createElement("img");
        novaSujeira.classList.add("sujeira");
        novaSujeira.src = 'assets/sujeira-dirty.png';
        novaSujeira.style.position = 'absolute';

        // Encontra posição livre para a barreira
        let posicaoValida = false;
        let x, y;
        while (!posicaoValida) {
            x = Math.random() * (window.innerWidth - 2 * margem - itemWidth) + margem;
            y = Math.random() * (window.innerHeight - 2 * margem - itemHeight) + margem;
            posicaoValida = verificaPosicaoLivre(x, y, itensExistentes);
        }

        novaSujeira.style.top = `${y}px`;
        novaSujeira.style.left = `${x}px`;
        campoGararPedras.appendChild(novaSujeira);
    }
}

let tomarDano = true;
const sujeiras = document.querySelectorAll(".sujeira");
// Função para reiniciar sala ao clicar no pilar
document.querySelector("#pilar").addEventListener("click", () => {
    if(todosBausAbertos){
        // Remove inimigos e baús da sala atual
        somReset();
        document.querySelector("#pilar").style.display = `none`;
        inimigos.forEach((inimigo) => inimigo.remove());
        sujeiras.forEach((sujeira) => sujeira.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        // Limpa arrays e reseta estados
        inimigos = [];
        baus = [];
        inimigosVida = [];
        bausBrisa = [];
        bodyEl.style.backgroundColor = `black`;
        posX = 0;
        posY = 30;
        playerEl.style.display = `none`;
        playerEl.style.top = `${posY}px`;
        playerEl.style.left = `${posX}px`;
        tomarDano = false;

        // Atualiza contador de salas e regenera os elementos após 1 segundo
        setTimeout(() => {
            bodyEl.style.backgroundColor = `rgb(73, 55, 46)`;
            gerarCoisas();
            areaDeAtaqueEl.style.transform = `translate(0px, 0px)`;
            playerEl.classList.add('piscando');
            playerEl.style.display = `block`;
            playerEl.classList.remove('piscando');
            document.querySelector("#pilar").style.display = `block`;
        }, 250);
        todosBausAbertos = false;

        setTimeout(()=>{
            tomarDano = true;
        }, 5000)
    }
});

// Atualiza posição de inimigos e verifica colisão
let direcaoInimigos = 8;

setInterval(() => {
    let colisaoComBarreiraSuperior = false;
    let colisaoComBarreiraInferior = false;

    // Primeiro, verifica colisões
    inimigos.forEach((inimigo) => {
        if (detectaColisaoUnica(inimigo, barreiraYU)) {
            colisaoComBarreiraSuperior = true;
        } else if (detectaColisaoUnica(inimigo, barreiraYD)) {
            colisaoComBarreiraInferior = true;
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
    // Inverte direção se necessário
    if (colisaoComBarreiraSuperior) {
        direcaoInimigos = 8;
        inimigos.forEach((inimigo) => {
            inimigo.style.transform = "scaleY(1)";
        });
    } else if (colisaoComBarreiraInferior) {
        direcaoInimigos = -8;
        inimigos.forEach((inimigo) => {
            inimigo.style.transform = "scaleY(-1)";
        });
    }

    // Move os inimigos
    inimigos.forEach((inimigo) => {
        const topComputado = parseInt(window.getComputedStyle(inimigo).top, 10);
        const novoTop = topComputado + direcaoInimigos;
        inimigo.style.top = `${novoTop}px`;
    });

    inimigos.forEach((inimigo) => {
        if (detectaColisaoUnica(hitBoxEl, inimigo) && tomarDano) {
            coracoes[0].remove();
            coracoes.splice(0, 1);
            tomarDano = false;
            somTomarDano();
            playerEl.classList.add('piscando');
            setTimeout(()=>{
                playerEl.classList.remove('piscando');
                tomarDano = true;
            }, 3000);
        }
    });
    armadilhas.forEach((armadilha) => {
        if (detectaColisaoUnica(hitBoxEl, armadilha) && tomarDano) {
            coracoes[0].remove();
            coracoes.splice(0, 1);
            tomarDano = false;
            somTomarDano();
            playerEl.classList.add('piscando');
            setTimeout(()=>{
                playerEl.classList.remove('piscando');
                tomarDano = true;
            }, 4000);
        }
    });

    // Checa colisão com baús
    baus.forEach((bau, i) => {
        if (detectaColisaoUnica(bau, playerEl)) {
            bau.src = "assets/bau-aberto.png";            
            atualizarProgresso(bausBrisa[i]);
            bausBrisa[i] = 0;
        }
    });

    const todosZero = bausBrisa.every(elemento => elemento === 0);
    if(todosZero){
        document.querySelector("#pilar img").src ="assets/buraco-aberto-dirty-boots.png";
        todosBausAbertos = true;
    }
    else{
        document.querySelector("#pilar img").src ="assets/buraco-fechado-dirty-boots.png";
        todosBausAbertos = false;
    }

    //se terminar a dungeon
    if(progresso >= 300){
        tomarDano = false;
        document.querySelector("#pilar").style.display = `none`;
        inimigos.forEach((inimigo) => inimigo.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        // Limpa arrays e reseta estados
        inimigos = [];
        baus = [];
        inimigosVida = [];
        bausBrisa = [];
    }
}, 50);

let indAnimEn = 0;
setInterval(() => {
    inimigos.forEach((inimigo) => {
        inimigo.src = inimigosRun[indAnimEn];
    });

    indAnimEn = indAnimEn === 0 ? 1 : 0; 
}, 250);

// Gera os elementos iniciais
gerarCoisas();






