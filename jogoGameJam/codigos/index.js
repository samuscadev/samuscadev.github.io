
let dicasInciais = [ "Você pode clicar nas setas 'Esquerda' e 'Direita' pra mover",
                    "Você pode Pular usando apertando 'Espaço'",
                    "Clique no Inimigo para atirar",
                    "Ei!, você parece estar em um sonho"   
];

const trilhasonoraEl = document.querySelector('#soundtrack');
const botaofecharEl = document.querySelector('#fechar');
const instrucoesEl = document.querySelector('#instrucoes');
const letreiroInicialEl = document.querySelector('#titulo-Principal');
const inimigoEl = document.querySelector('#inimigo-tutorial');
const dicasEl = document.querySelector('#dica');
const botaoPrincipalEl = document.querySelector("#botao-start");
const blocoEl = document.querySelector("#player-tutorial");
const spriteblocoEl = document.querySelector("#player-tutorial img");


botaofecharEl.addEventListener('click', ()=>{
    instrucoesEl.style.opacity = '0';
    trilhasonoraEl.play();
    setTimeout(()=>{ 
        instrucoesEl.style.display = 'none';
    }, 750);
});

botaoPrincipalEl.addEventListener('click', ()=>{
    blocoEl.style.display = 'block';
    letreiroInicialEl.style.opacity= '0';
    botaoPrincipalEl.style.opacity= '0';


    setTimeout(()=>{
        botaoPrincipalEl.style.display = 'none';
        dicasEl.innerHTML = "Use ← e → para mover"
    }, 2000);
    setTimeout(()=>{
        dicasEl.innerHTML = "Use ← e → para mover<BR>Use espaço para PULAR"
    }, 3000);
    setTimeout(()=>{
        dicasEl.innerHTML = "Use ← e → para mover<BR>Use espaço para PULAR<br>Se aproxime de Inimigos<br>"
    }, 4000);
    setTimeout(()=>{
        inimigoEl.style.display = 'block';
        dicasEl.innerHTML = "Use ← e → para mover<BR>Use espaço para PULAR<br>Se aproxime de Inimigos<br>E clique Neles para Atirar"
    }, 5000);
});


let posX = 0;
let intervalID = null;
let velocidade = 1.0; 
const incrementoVelocidade = 0.1;
const velocidadeMaxima = 1.5;
const velocidadeNormal = 1.0;

let animacaoCorrer = null;
let indiceCorrida = 0;
let protagonistaRun = [
    "assets/protagonista-run1.svg",
    "assets/protagonista-run2.svg",
    "assets/protagonista-run3.svg",
    "assets/protagonista-run4.svg",
];
function animarCorrida() {
    spriteblocoEl.src = protagonistaRun[indiceCorrida];
    indiceCorrida = (indiceCorrida + 1) % protagonistaRun.length; // Cicla os índices
}

document.addEventListener("keydown", (event) => {
    if (intervalID) return; // Evita criar múltiplos intervals

    switch (event.key) {
        case "ArrowRight":
            intervalID = setInterval(() => andar(1), 50);
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 100);
            acelerar();
            break;
        case "ArrowLeft":
            intervalID = setInterval(() => andar(-1), 50);
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 100);
            acelerar();
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowRight":
        case "ArrowLeft":
            clearInterval(animacaoCorrer); // Para a animação horizontal
            animacaoCorrer = null;
            spriteblocoEl.src = "assets/protagonista-comtemplativo.svg";
            clearInterval(intervalID);
            intervalID = null;
            velocidade = velocidadeNormal; // Reseta a velocidade ao normal
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
    }, 500);
}
let bottomJogador = 30;
const alturaInicial = 30; 
const alturaMaxima = 45;
let pulando = false; // Variável para impedir múltiplos pulos

document.addEventListener("keydown", (event) => {
    if (event.key === " " && !pulando) { // Só pula se não estiver no ar
        pular();
    }
});

function pular() {
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
        if (bottomJogador - 6 > alturaInicial) {
            bottomJogador -= 6;
            blocoEl.style.bottom = `${bottomJogador}vh`;
        } else {
            bottomJogador = alturaInicial;
            blocoEl.style.bottom = `${bottomJogador}vh`;
            clearInterval(descendo);
            pulando = false; // Libera um novo pulo após o personagem tocar o chão
        }
    }, 65);
}


function atirar(evento) {
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

    // Definir posição inicial do tiro (onde está o jogador)
    projetil.style.left = `${jogadorX}px`;
    projetil.style.top = `${jogadorY + 65}px`;

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
});

