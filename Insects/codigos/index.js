let spritesInimigo = [
    "assets/brisa-ghost.svg",
    "assets/brisa-ghost2.svg",
];
let indexAnimInimigo = 0;
const trilhasonoraEl = document.querySelector('#soundtrack');
const botaofecharEl = document.querySelector('#fechar');
const instrucoesEl = document.querySelector('#instrucoes');
const letreiroInicialEl = document.querySelector('#titulo-Principal');
const inimigoEl = document.querySelector('#inimigo-tutorial');
const dicasEl = document.querySelector('#dica');
const botaoPrincipalEl = document.querySelector("#botao-start");
const blocoEl = document.querySelector("#player-tutorial");
const spriteblocoEl = document.querySelector("#player-tutorial img");
const alcance = document.querySelector("#alcance");
const portal = document.querySelector("#portal-tutorial");
const somAgua = document.querySelector("#somagua");


let podeAtirar = false;
let inimigoEmTela = false;
let inimigosPassados = 1;
let vidaIninmigo = 8;
let abrirPortal = false;
let tomarDano = true;

let vidasJogador = 6;
let coracoes = [];
const campoCoracoes = document.querySelector("#coracoes");

for(let i=0; i < vidasJogador; i++){
    const novoCoracao = document.createElement("img");
    coracoes.push(novoCoracao);
    novoCoracao.classList.add("icone-coracao");
    novoCoracao.src = "assets/heart-icon.svg";
    campoCoracoes.appendChild(novoCoracao);
}

function darDanoJogador(){
    tomarDano = false;
    coracoes[0].remove();
    coracoes.splice(0, 1);
    vidasJogador --;
    console.log(vidasJogador);
    blocoEl.classList.add('piscando');

    setTimeout(()=>{
        if(coracoes.length != 6){
            const novoCoracao = document.createElement("img");
            coracoes.push(novoCoracao);
            novoCoracao.classList.add("icone-coracao");
            novoCoracao.src = "assets/heart-icon.svg";
            campoCoracoes.appendChild(novoCoracao);
        }
    }, 3500);
    setTimeout(()=>{
        blocoEl.classList.remove('piscando');
        tomarDano = true;
    }, 4500);
}

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
        podeAtirar = true;
        botaoPrincipalEl.style.display = 'none';
    }, 1000);

    setTimeout(()=>{
        letreiroInicialEl.style.display = 'none';
        inimigoEl.style.display = 'block';
        inimigoEmTela = true;
        campoCoracoes.style.display = 'block';    
    }, 2000);
});

let posInimigo = inimigoEl.getBoundingClientRect();
let posXInimigo = posInimigo.right;

function gerarInimigo(){
    if(inimigosPassados < 6){
        inimigosPassados ++;
        inimigoEl.style.right = `15px`; 
        vidaIninmigo = 5;
        posXInimigo = posInimigo.right;
        setTimeout(()=>{
            inimigoEl.style.display = 'block';
            inimigoEmTela = true;
        }, 2000);
    }
    else{
        abrirPortal = true;
    }
}

setInterval(()=>{
    if(inimigoEmTela){
        if(estaDentroDaJanela(inimigoEl)){
            posXInimigo += 10;
            inimigoEl.style.right = `${posXInimigo}px`; 
        }
        else{
            inimigoEl.style.display = 'none';
            inimigoEmTela = false;
            gerarInimigo();
        }
    }

    if(detectaColisaoUnica(inimigoEl, alcance)){
        inimigoEl.style.cursor = 'pointer';
    }
    else{
        inimigoEl.style.cursor = 'default';
    }

    if(detectaColisaoUnica(inimigoEl, blocoEl) && tomarDano){
        darDanoJogador();
    }
}, 100);

inimigoEl.addEventListener("click", ()=>{
    if(detectaColisaoUnica(inimigoEl, alcance)){
        if(vidaIninmigo != 0){
            vidaIninmigo --;
            console.log(vidaIninmigo);
            inimigoEl.style.filter = 'contrast(20%) brightness(200%)';
            setTimeout(()=>{inimigoEl.style.filter = 'none'}, 500);
        }
        else{
            inimigoEl.style.display = 'none';
            inimigoEmTela = false;
            gerarInimigo();
        }
    } 
})

let posX = 0;
let intervalID = null;
let velocidade = 1.0; 
const incrementoVelocidade = 0;
const velocidadeMaxima = 1.0;
const velocidadeNormal = 1.0;

let animacaoCorrer = null;
let indiceCorrida = 0;

function animarCorrida() {
    spriteblocoEl.src = protagonistaRun[indiceCorrida];
    indiceCorrida = (indiceCorrida + 1) % protagonistaRun.length; // Cicla os índices
}

document.addEventListener("keydown", (event) => {
    if (intervalID) return; // Evita criar múltiplos intervals

    switch (event.key) {
        case "ArrowRight":
            intervalID = setInterval(() => andar(1), 50);
            somAgua.play();
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 100);
            acelerar();
            break;
        case "ArrowLeft":
            somAgua.play();
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
            somAgua.pause();
            clearInterval(animacaoCorrer); // Para a animação horizontal
            animacaoCorrer = null;
            spriteblocoEl.src = "assets/Protagonista/protagonista-comtemplativo.svg";
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
            projetil.style.width = "30px";
        }, 350);
        setTimeout(() => {
            projetil.remove();
        }, 500);
        
    }
    requestAnimationFrame(moverProjetil);
}
document.addEventListener("click", (event)=>{
    if(podeAtirar){
        atirar(event);
    }
});

setInterval(()=>{
    inimigoEl.src = `${spritesInimigo[indexAnimInimigo]}`;
    indexAnimInimigo = (indexAnimInimigo + 1) % spritesInimigo.length;
}, 333);

let portalAtivo = false;
setInterval(()=>{
    if(abrirPortal){
        portal.style.display = "block";
        portalAtivo = true;
    }

    if(detectaColisaoUnica(blocoEl, portal) && portalAtivo){
        blocoEl.style.transition = "all 100ms ease-in-out";
        setTimeout(()=>{
            blocoEl.style.opacity = 0.75;
        }, 100);
        setTimeout(()=>{
            blocoEl.style.opacity = 0.5;
        }, 250);
        setTimeout(()=>{
            blocoEl.style.opacity = 0.25;
        }, 350);
        setTimeout(()=>{
            blocoEl.style.opacity = 0;
        }, 500);
        setTimeout(()=>{
            blocoEl.style.display = "none";
        }, 1000);


        setTimeout(()=>{
            portal.style.opacity = 0.75;
        }, 1100);
        setTimeout(()=>{
            portal.style.opacity = 0.5;
        }, 1250);
        setTimeout(()=>{
            portal.style.opacity = 0.25;
        }, 1350);
        setTimeout(()=>{
            portal.style.opacity = 0;
        }, 1500);
        setTimeout(()=>{
            portal.style.display = "none";
        }, 2000);
        setTimeout(() => {
            window.location.href = "Cena-de-introdução.html";
        }, 3000);
    }
}, 1000);
