const blocoEl = document.querySelector("#bloco");
const spriteblocoEl = document.querySelector("#bloco img");
let jogadorVivo = true;
let bossVivo = true;

let posX = 0;
let intervalID = null;
let velocidade = 1.0; 
let pulando = false; // Variável para impedir múltiplos pulos


const incrementoVelocidade = 0;
const velocidadeMaxima = 2.5;
const velocidadeNormal = 1.0;

let animacaoCorrer = null;
let indiceCorrida = 0;

function animarCorrida() {
    if (pulando){ 
        spriteblocoEl.src = "assets/Protagonista/protagonista-jump.svg";
    }
    else{
        spriteblocoEl.src = protagonistaRun[indiceCorrida];
        indiceCorrida = (indiceCorrida + 1) % protagonistaRun.length; // Cicla os índices
    }
}

document.addEventListener("keydown", (event) => {
    if (intervalID || !jogadorVivo || !bossVivo) return; 

    tocarMusica();
    switch (event.key) {
        case "ArrowRight":
            intervalID = setInterval(() => andar(1), 50);
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 90);
            acelerar();
            break;
        case "ArrowLeft":
            intervalID = setInterval(() => andar(-1), 50);
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 90);
            acelerar();
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (!jogadorVivo || !bossVivo) return; 
    switch (event.key) {
        case "ArrowRight":
        case "ArrowLeft":
            clearInterval(animacaoCorrer);
            animacaoCorrer = null;
            spriteblocoEl.src = "assets/Protagonista/protagonista-comtemplativo.svg";
            clearInterval(intervalID);
            intervalID = null;
            velocidade = velocidadeNormal;
            break;
    }
});

function andar(deltaX) {
    // Calcular nova posição no eixo X com base na velocidade atual
    const novaPosX = posX + deltaX * 10 * velocidade;

    // Verificar limites da janela no eixo X
    const limiteDireito = window.innerWidth - blocoEl.offsetWidth;

    // Garantir que a posição está dentro dos limites
    posX = Math.max(0, Math.min(novaPosX, limiteDireito));

    // Ajustar animação e direção
    blocoEl.style.transform = `translate(${posX}px, 0) scaleX(${deltaX < 0 ? -1 : 1})`;
}

function acelerar() {
    // Aumentar a velocidade progressivamente até o máximo
    const aceleracaoInterval = setInterval(() => {
        if (intervalID === null || velocidade >= velocidadeMaxima) {
            clearInterval(aceleracaoInterval); // Parar a aceleração se a tecla foi solta ou velocidade máxima atingida
        } else {
            velocidade = Math.min(velocidade + incrementoVelocidade, velocidadeMaxima);
        }
    }, 500); // Incrementar a cada 100 ms
}
let bottomJogador = 20;
const alturaInicial = 20; 
const alturaMaxima = 40;


document.addEventListener("keydown", (event) => {
    if (event.key === " " && !pulando) { // Só pula se não estiver no ar
        pular();
    }
});

function pular() {

    if(!bossVivo ||!jogadorVivo){
        return;
    }
    pulando = true; // Bloqueia novos pulos enquanto o personagem estiver no ar
    let subindo = setInterval(() => {
        if (bottomJogador < alturaMaxima) {
            bottomJogador += 5;
            blocoEl.style.bottom = `${bottomJogador}vh`;
        } else {
            clearInterval(subindo);
            cair();
        }
    }, 65);
}

function cair() {
    let descendo = setInterval(() => {
        if (bottomJogador - 5 > alturaInicial) {
            bottomJogador -= 5;
            blocoEl.style.bottom = `${bottomJogador}vh`;
        } else {
            bottomJogador = alturaInicial;
            blocoEl.style.bottom = `${bottomJogador}vh`;
            clearInterval(descendo);
            pulando = false; // Libera um novo pulo após o personagem tocar o chão
        }
    }, 65);
}

let tempoTiro = true;
function atirar(evento) {
    if(!bossVivo ||!jogadorVivo || !tempoTiro){
        return;
    }
    // Posição do jogador
    const jogadorRect = blocoEl.getBoundingClientRect();
    const jogadorX = jogadorRect.left + jogadorRect.width / 2;
    const jogadorY = jogadorRect.top + jogadorRect.height / 2;

    // Posição do clique
    const destinoX = evento.clientX;
    const destinoY = evento.clientY;

    // Criar o projétil
    const projetil = document.createElement("div");
    projetil.classList.add("projetil");
    document.body.appendChild(projetil);
    tempoTiro = false;
    setTimeout(()=>{
        tempoTiro = true;
    }, 500);
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
        }, 800);
        setTimeout(() => {
            projetil.remove();
        }, 900); 
        
    }
    requestAnimationFrame(moverProjetil);
    progeteis
}
document.addEventListener("click", (event)=>{
    atirar(event);
});

let vidasJogador = localStorage.getItem("vidaPlayer");

let coracoes = [];
const campoCoracoes = document.querySelector("#coracoes");
for(let i=0; i < vidasJogador; i++){
    const novoCoracao = document.createElement("img");
    coracoes.push(novoCoracao);
    novoCoracao.classList.add("icone-coracao");
    novoCoracao.src = "assets/heart-icon.svg";
    campoCoracoes.appendChild(novoCoracao);
}
