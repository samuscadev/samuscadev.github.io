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
let animacaoDescer = null;
let animacaoSubir = null;
let indiceCorrida = 0;
let indiceSubida = 0;
let indiceDescida = 0;

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
, 50)

let protagonistaRun = [
    "assets/protagonista-run1.svg",
    "assets/protagonista-run2.svg",
    "assets/protagonista-run3.svg",
    "assets/protagonista-run4.svg",
];
let protagonistaUpRun = [
    "assets/protagonista-atras.svg",
    "assets/protagonista-atras2.svg",
];
let protagonistaDownRun = [
    "assets/protagonista-base.svg",
    "assets/protagonista-base2.svg",
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
        spriteplayerEl.src = "assets/protagonista-comtemplativo.svg";
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
let vetorSujeiras = [];
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
            projetil.style.backgroundImage = `url("assets/tiro-disparado.svg")`;
            projetil.style.width = "30px";
        }, 350);
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
    const limiteSujeira = Math.floor(Math.random() * 10) + 2;
    // Lista de itens existentes para verificar colisões
    let itensExistentes = [];

    // Gera baús
    for (let i = 0; i < limiteBaus; i++) {
        const novoBau = document.createElement("img");
        novoBau.classList.add("bau");
        novoBau.src = 'assets/bau-fechado-dirty.svg';
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
                novoInimigo.style.filter = `contrast(20%) brightness(200%)`;
                setTimeout(()=>{
                    novoInimigo.style.filter = `contrast(100%) brightness(100%)`;
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
        vetorSujeiras.push(novaSujeira);
        novaSujeira.src = 'assets/pedras-dirty-boots.svg';
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
        itensExistentes.push(novaSujeira);
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
        vetorSujeiras.forEach((sujeira) => sujeira.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        // Limpa arrays e reseta estados
        inimigos = [];
        baus = [];
        inimigosVida = [];
        bausBrisa = [];
        bodyEl.style.backgroundImage = `radial-gradient(rgb(77, 255, 246), rgb(77, 255, 246), rgb(77, 255, 246))`;
        posX = 0;
        posY = 30;
        playerEl.style.display = `none`;
        playerEl.style.top = `${posY}px`;
        playerEl.style.left = `${posX}px`;
        tomarDano = false;

        // Atualiza contador de salas e regenera os elementos após 1 segundo
        setTimeout(() => {
            bodyEl.style.backgroundImage = "url('assets/dirty-boots-floor.svg')";
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
            spriteplayerEl.src = "assets/protagonista-brisa.svg";
            bau.src = 'assets/bau-aberto-dirty.svg';  
            atualizarProgresso(bausBrisa[i]);
            bausBrisa[i] = 0;
        }
    });

    const todosZero = bausBrisa.every(elemento => elemento === 0);
    if(todosZero){
        document.querySelector("#pilar img").src ="assets/pilar-aberto-dirty-boots.svg";
        todosBausAbertos = true;
    }
    else{
        document.querySelector("#pilar img").src ="assets/pilar-dirty-boots.svg";
        todosBausAbertos = false;
    }

    //se terminar a dungeon
    if(progresso >= 300){
        tomarDano = false;
        document.querySelector("#pilar").style.display = `none`;
        inimigos.forEach((inimigo) => inimigo.remove());
        vetorSujeiras.forEach((sujeira) => sujeira.remove());
        baus.forEach((bau) => bau.remove());
        armadilhas.forEach((bau) => bau.remove());
        // Limpa arrays e reseta estados
        inimigos = [];
        vetorSujeiras = [];
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

function criarBolha() {
    const bolha = document.createElement('div');
    bolha.classList.add('bolha');

    const tamanho = Math.random() * 20 + 10; // Tamanho entre 10px e 30px
    bolha.style.width = `${tamanho}px`;
    bolha.style.height = `${tamanho}px`;

    // Posição horizontal aleatória
    bolha.style.bottom = `10vh`;
    bolha.style.left = `${Math.random() * 100}vw`;

    document.body.appendChild(bolha);

    // Remover a bolha quando a animação acabar
    bolha.addEventListener('animationend', () => {
      bolha.remove();
    });
  }

  // Criar bolhas periodicamente
  setInterval(criarBolha, 500);






