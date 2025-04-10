const background = document.querySelector("#fundao");
const playerEl = document.querySelector("#bloco");
const limiteTam = window.innerWidth - 10;
const limiteXtela = window.innerWidth * 0.998;
const chao = document.querySelector("#piso");
const hitBoxPlayer = document.querySelector("#hit-box");
const hitBoxBoss = document.querySelector("#boss-hit-box");
const campoGeracao = document.querySelector("#progeteis");
const bossEl = document.querySelector("#boss");
let bossSprite = document.querySelector("#boss img");
const trilhaSonora = document.getElementById("soundtrack");
const trilhaVitoria = document.getElementById("soundwin");

let tomarDano = true;
let proximaFase;
let textoApareceu = false;
let ataqueAcontecendo = false;
let playerAtaqueTime = false;
let vidaBoss = 110;

function deletarIntervalos(){
    let highestId = setInterval(() => {}, 0);
    playerEl.classList.remove('piscando');
        for (let i = 0; i <= highestId; i++) {
            clearInterval(i); // Limpa todos os intervalos até o ID mais alto
        }
}

function darDanoJogador(){
    if(!jogadorVivo || !tomarDano){
        return;
    }
    coracoes[0].remove();
        coracoes.splice(0, 1);
        tomarDano = false;
        vidasJogador --;
        if (vidasJogador == 0) {
            jogadorVivo = false;
            jogadorMorreu();
        }
        playerEl.classList.add('piscando');
        setTimeout(()=>{
            playerEl.classList.remove('piscando');
            tomarDano = true;
        }, 3000);
}
function jogadorMorreu(){
    jogadorVivo = false;
    document.querySelector("#telaMorte").style.display = 'flex';
    spriteblocoEl.src = "assets/Protagonista/protagonista-died.svg";
    spriteblocoEl.style.width = '180px';
    spriteblocoEl.style.height = '110px';
    background.style.backgroundImage = `url("assets/died-background.svg")`;
    background.style.filter = 'none';
    document.querySelectorAll(".quadrado").forEach(quadradinho =>{
        quadradinho.style.display = 'none';
    })
    campoGeracao.innerHTML = "";
    bolasGeracao.innerHTML = "";
    rolantesGeracao.innerHTML = "";
    canhao.style.display = 'none';
    minionEsquerda.style.display = 'none';
    minionDireita.style.display = 'none';
    bossEl.style.display = 'none';
    chao.style.display = 'none';
    deletarIntervalos();
}

function jogadorVenceuBoss(){
    document.querySelector("#telaVitoria").style.display = 'block';
    setTimeout(()=>{
        document.querySelector("#telaVitoria").style.opacity = '1';
    }, 500);
    setTimeout(deletarIntervalos, 1000);
}

function tocarMusica() {
    trilhaSonora.volume = 0.7;
    trilhaSonora.play();
}


const sabioUm = document.querySelector("#sabio1");
const sabioDois = document.querySelector("#sabio2");
const sabioTres = document.querySelector("#sabio3");
const sabioQuatro = document.querySelector("#sabio4");
const rei = document.querySelector("#rei");

//Variaveis de controle

let timeSabios = false;
let timeRei = false;
let timeRainha = false;

let nomeBossEl = document.querySelector("#nome-boss");
function aparecerTexto(){
    setTimeout(()=>{
        nomeBossEl.style.opacity = "1";
    } , 1000);
    setTimeout(()=>{
        nomeBossEl.style.opacity = "0";
        textoApareceu = true;
        setTimeout(()=>{ nomeBossEl.style.display = 'none';} , 100);
        timeSabios = true;
    } , 4000);
    
}
aparecerTexto();


const sabios = [sabioUm, sabioDois, sabioTres, sabioQuatro];
const vidas = [10, 20, 30, 40];

function criarAtaque(sabio) {
    const bolaDeEnergia = document.createElement("div");
    bolaDeEnergia.classList.add("bola-de-energia");
    document.body.appendChild(bolaDeEnergia);
    
    const rectSabio = sabio.getBoundingClientRect();
    const rectPlayer = playerEl.getBoundingClientRect();
    
    bolaDeEnergia.style.left = `${rectSabio.left + rectSabio.width / 2}px`;
    bolaDeEnergia.style.top = `${rectSabio.top}px`;
    
    const deltaX = rectPlayer.left + rectPlayer.width / 2 - (rectSabio.left + rectSabio.width / 2);
    const deltaY = rectPlayer.top + rectPlayer.height / 2 - rectSabio.top;
    const distancia = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const velX = (deltaX / distancia) * 5;
    const velY = (deltaY / distancia) * 5;
    
    const intervalo = setInterval(() => {
        bolaDeEnergia.style.left = `${bolaDeEnergia.offsetLeft + velX}px`;
        bolaDeEnergia.style.top = `${bolaDeEnergia.offsetTop + velY}px`;
        
        if (detectaColisaoUnica(bolaDeEnergia, playerEl)) {
            darDanoJogador();
            bolaDeEnergia.remove();
            clearInterval(intervalo);
        }
    }, 50);
    
    setTimeout(() => {
        bolaDeEnergia.remove();
        clearInterval(intervalo);
    }, 4000);
}

function ondaSabios() {
    sabios.forEach((sabio, index) => {
        setTimeout(() => {
            if (vidas[index] > 0) {
                sabio.style.display = 'block';
                criarAtaque(sabio);
            }
        }, index * 200);
    });
    setTimeout(ondaSabios, 3000);
}

sabios.forEach((sabio, index) => {
    sabio.addEventListener("click", () => {
        vidas[index]--;
        sabio.style.filter = "contrast(20%) brightness(200%)";
        setTimeout(()=>{
            sabio.style.filter = `none`;
        },100)
        if (vidas[index] <= 0) {
            sabio.style.display = "none";
            verificarSabios();
        }
    });
});

function verificarSabios() {
    if (vidas.every(vida => vida <= 0)) {
        timeRei = true;
    }
}


//rei
let vidaRei = 100;
let posicaoDireita = false;
let intervaloTeleporte;
let intervaloAtaques;

function criarAtaqueRei() {
    if (rei.style.display === "none") return;
    
    const ataqueRei = document.createElement("div");
    ataqueRei.classList.add("ataque-do-rei");
    document.body.appendChild(ataqueRei);
    
    const rectRei = rei.getBoundingClientRect();
    ataqueRei.style.left = posicaoDireita ? `${rectRei.left}px` : `${rectRei.right}px`;
    ataqueRei.style.bottom = `27vh`;
    
    const velocidade = posicaoDireita ? -7 : 7;
    
    const intervalo = setInterval(() => {
        ataqueRei.style.left = `${ataqueRei.offsetLeft + velocidade}px`;
        
        if (detectaColisaoUnica(ataqueRei, playerEl)) {
            darDanoJogador();
            ataqueRei.remove();
            clearInterval(intervalo);
        }
        
        if ((posicaoDireita && ataqueRei.offsetLeft <= window.innerWidth * 0.5) || (!posicaoDireita && ataqueRei.offsetLeft >= window.innerWidth * 0.5)) {
            ataqueRei.remove();
            clearInterval(intervalo);
        }
    }, 40);
}

function teleportarRei() {
    rei.style.display = "none";
    
    setTimeout(() => {
        posicaoDireita = !posicaoDireita;
        rei.style.left = posicaoDireita ? "80vw" : "8vh";
        rei.style.transform = posicaoDireita ? "scaleX(1)" : "scaleX(-1)";
        rei.style.display = "block";
        rei.style.filter = "contrast(10%) brightness(300%)";
        setTimeout(() => { rei.style.filter = 'none'}, 500);
        iniciarAtaquesRei();
    }, 1000);
}

function iniciarAtaquesRei() {
    clearInterval(intervaloAtaques);
    intervaloAtaques = setInterval(criarAtaqueRei, 800);
}

function ondaRei() {
    clearInterval(intervaloTeleporte);
    intervaloTeleporte = setInterval(() => {
        clearInterval(intervaloAtaques);
        teleportarRei();
    }, vidaRei > 25 ? 5000 : 2000);
}

rei.addEventListener("click", () => {
    if (rei.style.display !== "none") {
        vidaRei -= 1;
        rei.style.filter = 'contrast(60%) brightness(200%)';
        setTimeout(()=>{
            rei.style.filter = 'none';
        }, 100);
        if (vidaRei <= 0) {
            rei.style.display = "none";
            clearInterval(intervaloTeleporte);
            clearInterval(intervaloAtaques);
            jogadorVenceuBoss();
        } else if (vidaRei === 25) {
            ondaRei();
        }
    }
});


//Procura O Ataque
setInterval(()=>{
    if(timeSabios){
        ondaSabios();
        timeSabios = false;
    }
    if(timeRei){
        bossSprite.src = "assets/Mantis-Boss/trono-vazio.svg"
        rei.style.display = 'block';
        ondaRei();
        timeRei = false;
    }
}, 50);

hitBoxBoss.addEventListener('click', ()=>{
    if(vidaBoss <= 0){
        bossVivo = false;
        trilhaSonora.pause();
        trilhaVitoria.play();
        setTimeout(jogadorVenceuBoss, 1000);
    }
    else if(playerAtaqueTime && jogadorVivo){
        vidaBoss --;
        bossSprite.style.filter = "contrast(40%) brightness(150%)";
        setTimeout(()=>{
            bossSprite.style.filter = "none";
        }, 500);
    }
  });

  
  
