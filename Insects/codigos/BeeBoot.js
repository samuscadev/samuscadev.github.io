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


const abeiaUm = document.querySelector("#abeia1");
const abeiaDois = document.querySelector("#abeia2");
const soldadoUm = document.querySelector("#solder1");
const soldadoDois = document.querySelector("#solder2");
const nota = document.getElementById("nota-musical");
const notaDois = document.getElementById("nota-musical2");
const notaTres = document.getElementById("nota-musical3");

//Variaveis de controle

let timeDrones = false;
let timeAbelhas = false;
let timeSoldados = false;
let timeMusica = false;

let nomeBossEl = document.querySelector("#nome-boss");
function aparecerTexto(){
    setTimeout(()=>{
        nomeBossEl.style.opacity = "1";
    } , 1000);
    setTimeout(()=>{
        nomeBossEl.style.opacity = "0";
        textoApareceu = true;
        setTimeout(()=>{ nomeBossEl.style.display = 'none';} , 100);
        timeDrones = true;
    } , 4000);
    
}
aparecerTexto();

function ondaDrones() {
    let drones = {
        droneUm: { elemento: document.querySelector("#drone1"), vida: 10 },
        droneDois: { elemento: document.querySelector("#drone2"), vida: 10 },
        droneTres: { elemento: document.querySelector("#drone3"), vida: 10 }
    };
    
    Object.values(drones).forEach(drone => {
        if (drone.elemento) drone.elemento.style.display = 'block';
    });
    
    let campoDeTiros = document.querySelector("#tiros-dos-drones");

    function moverDrone(drone, posInicial, limite, velocidade) {
        let posX = posInicial;
        let somaPos = velocidade;

        let movimento = setInterval(() => {
            if (drone.elemento && drone.elemento.parentNode) {
                posX += somaPos;
                drone.elemento.style.left = `${posX}vw`;
                
                if (posX >= limite.max || posX <= limite.min) {
                    somaPos *= -1;
                }
            } else {
                clearInterval(movimento);
            }
        }, 100);
    }

    moverDrone(drones.droneUm, 2, { min: 2, max: 80 }, 1);
    moverDrone(drones.droneDois, 40, { min: 40, max: 90 }, 2);
    moverDrone(drones.droneTres, 80, { min: 20, max: 80 }, -1);

    function atirar(drone) {
        if (!drone.elemento || !drone.elemento.parentNode) return;
        let tiroDrone = document.createElement("div");
        tiroDrone.classList.add("tiro-drones");
        campoDeTiros.appendChild(tiroDrone);
        
        let posDrone = drone.elemento.getBoundingClientRect();
        tiroDrone.style.left = `${posDrone.left + posDrone.width / 2}px`;
        tiroDrone.style.top = `${posDrone.top}px`;
        
        let movimentoTiro = setInterval(() => {
            let posTop = parseInt(tiroDrone.style.top);
            if(detectaColisaoUnica(hitBoxPlayer, tiroDrone)){
                darDanoJogador();
            }
            if (posTop >= window.innerHeight * 0.85) {
                clearInterval(movimentoTiro);
                tiroDrone.remove();
            } else {
                tiroDrone.style.top = `${posTop + 5}px`;
            }
        }, 50);
    }

    let intervaloAtaquesDrones = setInterval(() => {
        Object.values(drones).forEach(drone => atirar(drone));
    }, 2000);

    function verificarTodosDestruidos() {
        if (Object.values(drones).every(drone => !drone.elemento)) {
            timeAbelhas = true;
            clearInterval(intervaloAtaquesDrones);
        }
    }

    function atacarDrone(drone) {
        if (!drone.elemento) return;
        drone.vida--;
        
        drone.elemento.style.filter = 'contrast(20%) brightness(200%)';
        setTimeout(() => {
            if (drone.elemento.parentNode) {
                drone.elemento.style.filter = 'none';
            }
        }, 100);
        
        console.log(`Drone vida: ${drone.vida}`);
        
        if (drone.vida <= 0) {
            drone.elemento.remove();
            drone.elemento = null;
            verificarTodosDestruidos();
        }
    }
    
    Object.values(drones).forEach(drone => {
        drone.elemento.addEventListener("click", () => atacarDrone(drone));
    });
}


function ondaAbelhas(){

    let acabouUm = false;
    let acabouDois = false;

    abeiaUm.style.display = 'block';
    abeiaDois.style.display = 'block';
    let abeiaUmVelocidade = -5;
    let abeiaDoisVelocidade = -3;
    let posXUma = 80;
    let posXduas = 80;

    let intervaloUm = setInterval(()=>{
        posXUma += abeiaUmVelocidade;
        abeiaUm.style.left = `${posXUma}vw`;
        if(posXUma <= 0){
            acabouUm = true;
            abeiaUm.style.display = 'none';
            clearInterval(intervaloUm);
        }
    }, 100);

    let intervaloDos = setInterval(()=>{
        posXduas += abeiaDoisVelocidade;
        abeiaDois.style.left = `${posXduas}vw`;
        if(posXduas <= 0){
            acabouDois = true;
            abeiaDois.style.display = 'none';
            clearInterval(intervaloDos);
        }
    }, 100);

    let fimAbelinhas = setInterval(()=>{
        if(acabouUm && acabouDois){
            timeSoldados = true;
            clearInterval(fimAbelinhas);
        }
    }, 50)
}

function ondaSoldados(){

    let vidaSoldadoUm = 12;
    let vidaSoldadodois = 15;
    let posSoldUm = 1;
    let posSoldDos = 85;
    let velocidadeUm = 5;
    let velocidadeDois = -5;
    soldadoUm.style.display = 'block';
    soldadoDois.style.display = 'block';
    let soldadoUmAtivo = true;
    let soldadoDoisAtivo = true;

    setInterval(()=>{
        if(!detectaColisaoUnica(soldadoUm, hitBoxPlayer)){
            posSoldUm += velocidadeUm;
            soldadoUm.style.left = `${posSoldUm}vw`;
        }      
        if(!detectaColisaoUnica(soldadoDois, hitBoxPlayer)){
            posSoldDos += velocidadeDois;
            soldadoDois.style.left = `${posSoldDos}vw`;
        }

        if(!estaDentroDaJanela(soldadoUm)){
            soldadoUm.style.display = `none`;
            soldadoUmAtivo = false;
        }
        if(!estaDentroDaJanela(soldadoDois)){
            soldadoDois.style.display = `none`;
            soldadoDoisAtivo = false;
        }   
    }, 1000);

    soldadoUm.addEventListener("click", ()=>{
        vidaSoldadoUm --;
        if(vidaSoldadoUm <= 0){
            soldadoUm.style.display = `none`;
            soldadoUmAtivo = false;
        }
        if (soldadoUmAtivo) {
            soldadoUm.style.filter = 'contrast(20%) brightness(200%)';
            setTimeout(() => {
                if (soldadoUmAtivo) {
                    soldadoUm.style.filter = 'none';
                }
            }, 100);
        }
    })

    soldadoDois.addEventListener("click", ()=>{
        vidaSoldadodois --;
        if(vidaSoldadodois <= 0){
            soldadoDois.style.display = `none`;
            soldadoDoisAtivo = false;
        }
        if (soldadoDoisAtivo) {
            soldadoDois.style.filter = 'contrast(20%) brightness(200%)';
            setTimeout(() => {
                if (soldadoDoisAtivo) {
                    soldadoDois.style.filter = 'none';
                }
            }, 100);
        }
    })
    setInterval(()=>{
        if(!soldadoUmAtivo && !soldadoDoisAtivo){
            timeMusica = true;
        }
    })
}

function ondaMusica() {

    nota.style.display = "block";
    notaDois.style.display = "block";
    notaTres.style.display = "block";
    playerAtaqueTime = true;
}

//Procura O Ataque
setInterval(()=>{
    if(timeDrones){
        ondaDrones();
        timeDrones = false;
    }
    if(timeAbelhas){
        ondaAbelhas();
        timeAbelhas = false;
    }
    if(timeSoldados){
        ondaSoldados();
        timeSoldados = false;
    }
    if(timeMusica){
        ondaMusica();
        timeMusica = false;
    }
}, 50);


setInterval(()=>{
    if(detectaColisaoUnica(hitBoxPlayer, abeiaUm)){
        darDanoJogador();
    }
    if(detectaColisaoUnica(hitBoxPlayer, abeiaDois)){
        darDanoJogador();
    }
    if(detectaColisaoUnica(hitBoxPlayer, soldadoUm)){
        darDanoJogador();
    }
    if(detectaColisaoUnica(hitBoxPlayer, soldadoDois)){
        darDanoJogador();
    }
    if(detectaColisaoUnica(hitBoxPlayer, nota)){
        darDanoJogador();
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

  
  
