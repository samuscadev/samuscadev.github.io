const background = document.querySelector("#fundao");
const playerEl = document.querySelector("#bloco");
const limiteTam = window.innerWidth - 10;
const limiteXtela = window.innerWidth * 0.998;
const chao = document.querySelector("#piso");
const canhao = document.querySelector("#cannon");
const hitBoxPlayer = document.querySelector("#hit-box");
const hitBoxBoss = document.querySelector("#boss-hit-box");
const minionEsquerda = document.querySelector("#minionEsq");
const minionDireita = document.querySelector("#minionDir");
const campoGeracao = document.querySelector("#progeteis");
const bossEl = document.querySelector("#boss");
let bossSprite = document.querySelector("#boss img");
const bolasGeracao = document.querySelector("#bolas");
const rolantesGeracao = document.querySelector("#rolantes");
const trilhaSonora = document.getElementById("soundtrack");
const trilhaVitoria = document.getElementById("soundwin");
let posYBolas = 0;
let posXBolas = 0;
let proximaFase;
let textoApareceu = false;
let ataqueAcontecendo = false;
let playerAtaqueTime = false;
let vidaBoss = 150;

function deletarIntervalos(){
    let highestId = setInterval(() => {}, 0);
    playerEl.classList.remove('piscando');
        for (let i = 0; i <= highestId; i++) {
            clearInterval(i); // Limpa todos os intervalos até o ID mais alto
        }
}

function darDanoJogador(){
    if(!jogadorVivo){
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

let progeteis = [];
let bolas = [];

//variaveis de verificacao
let progeteisEstaoCaindo = false;
let bolasEstaoVoando = false;
let bolasEstaoRolando = false;
let tomarDano = true;

let nomeBossEl = document.querySelector("#nome-boss");
function aparecerTexto(){
    setTimeout(()=>{
        nomeBossEl.style.opacity = "1";
    } , 1000);
    setTimeout(()=>{
        nomeBossEl.style.opacity = "0";
        textoApareceu = true;
        setTimeout(()=>{ nomeBossEl.style.display = 'none';} , 100);
    } , 4000);
    
}
aparecerTexto();

let ultimoNumero = 0;
let ondaAtual = 1;

let intervaloAtaques = setInterval(() => {
    if (textoApareceu && !ataqueAcontecendo && !playerAtaqueTime && jogadorVivo && bossVivo) {
        let proximaFase;
        do {
            proximaFase = Math.floor(Math.random() * 3) + 1;
        } while (proximaFase === ultimoNumero);

        ultimoNumero = proximaFase;
        ataqueAcontecendo = true;

        if (proximaFase === 1) {
            ondaAtual = 1;
            setTimeout(onda1, 100);
        }
        if (proximaFase === 2) {
            ondaAtual = 2;
            setTimeout(onda2, 100);
        }
        if (proximaFase === 3) {
            ondaAtual = 3;
            setTimeout(onda3, 50);
        }
    }
}, 100);

//variaveis Onda1
let limiteQuedasOndaUm = 8;
let contadorQuedas = 0;
let limiteBolasOndaUm = 4;
let contadorBolas = 0;
let limiteRolasOndaUm = 7;
let contadorRolas = 0;
let intervaloQuedaProjeteis = null;
let intervaloBolasVoando = null;
let intervaloRolasRolando = null;

function onda1(){
    canhao.style.display = 'block';
    intervaloQuedaProjeteis = setInterval(() => {
            if (!progeteisEstaoCaindo) {
                progeteisEstaoCaindo = true;
                let quantidadeDeProgeteis = Math.floor(Math.random() * 4) + 2;
                contadorQuedas++;
                setTimeout(criarProgeteis, 1000, quantidadeDeProgeteis);
            }
            if (contadorQuedas >= limiteQuedasOndaUm) {
                clearInterval(intervaloQuedaProjeteis);
                intervaloQuedaProjeteis = null; // Corrigido aqui
                verificarFinalizacao(); // Verifica o estado final
            }
        }, 500);

        intervaloBolasVoando = setInterval(() => {
            if (!bolasEstaoVoando) {
                bolasEstaoVoando = true;
                contadorBolas++;
                setTimeout(criarBolas, 2500);
            }
            if (contadorBolas >= limiteBolasOndaUm) {
                clearInterval(intervaloBolasVoando);
                intervaloBolasVoando = null; // Corrigido aqui
                verificarFinalizacao(); // Verifica o estado final
            }
        }, 500);

        intervaloRolasRolando = setInterval(() => {
            if (!bolasEstaoRolando) {
                bolasEstaoRolando = true;
                contadorRolas++;
                setTimeout(() => {
                    canhao.src = "assets/Arac-Boss/super-spider-cannon-cuspindo.svg";
                }, 700);
                setTimeout(criarRolas, 1000);
                setTimeout(() => {
                    canhao.src = "assets/Arac-Boss/super-spider-cannon.svg";
                }, 1300);
            }
            if (contadorRolas >= limiteRolasOndaUm) {
                clearInterval(intervaloRolasRolando);
                intervaloRolasRolando = null;
                verificarFinalizacao();
            }
        }, 500);
}

function verificarFinalizacao() {
    if (
        contadorQuedas >= limiteQuedasOndaUm &&
        contadorBolas >= limiteBolasOndaUm &&
        contadorRolas >= limiteRolasOndaUm &&
        intervaloQuedaProjeteis === null &&
        intervaloBolasVoando === null &&
        intervaloRolasRolando === null
    ) {
        // Reset dos contadores para a próxima onda
        contadorQuedas = 0;
        contadorBolas = 0;
        contadorRolas = 0;

        playerAtaqueTime = true;
        ataqueAcontecendo = false;

        setTimeout(() => {
            canhao.style.display = 'none';
        }, 1300);
    }
}

//onda2
const metadeTela = window.innerWidth * 0.5;

function onda2() {
    let minionLeft = 0;
    let minionLeftIndo = true;
    let minionRightIndo = true;
    let minionRight = 0;
    let intervaloMinionEsquerda = null;
    let intervaloMinionDireita = null;

    // Função para movimentar o minion da esquerda
    function moverMinionEsquerda() {
        minionEsquerda.style.display = 'block';
        intervaloMinionEsquerda = setInterval(() => {
            if (minionLeft < metadeTela && minionLeftIndo) {
                minionLeft += 30;
                minionEsquerda.style.left = `${minionLeft}px`;
            } else if (minionLeft >= metadeTela) {
                minionLeftIndo = false;
            }

            if (!minionLeftIndo && minionLeft > 0) {
                minionLeft -= 30;
                minionEsquerda.style.left = `${minionLeft}px`;
            }

            if (minionLeft <= 0 && !minionLeftIndo) {
                clearInterval(intervaloMinionEsquerda);
                intervaloMinionEsquerda = null;
                moverMinionDireita(); // Inicia o movimento do minion da direita
            }
        }, 120);
    }

    
    function moverMinionDireita() {
        minionDireita.style.display = 'block';
        minionEsquerda.style.display = 'none';

        intervaloMinionDireita = setInterval(() => {
            if (minionRight < metadeTela && minionRightIndo) {
                minionRight += 50;
                minionDireita.style.right = `${minionRight}px`;
            } else if (minionRight >= metadeTela) {
                minionRightIndo = false;
            }

            if (!minionRightIndo && minionRight > 0) {
                
                minionRight -= 50;
                minionDireita.style.right = `${minionRight}px`;
            }

            if (minionRight <= 0 && !minionRightIndo) {
                minionDireita.style.display = 'none';
                playerAtaqueTime = true;
                ataqueAcontecendo = false;
                clearInterval(intervaloMinionDireita);
                intervaloMinionDireita = null;
            }
        }, 120);
    }

    // Começa o movimento do minion da esquerda
    setTimeout(() => {
        moverMinionEsquerda();
    }, 1000);
}

//variavel da onda3
let intervaloOndaTres = null;
let maxOndaTres = 6;
let teiasDanosas = [];

function onda3(){
    intervaloOndaTres =  setInterval(criarQuadrados, 4000);

    function criarQuadrados() {
        if(maxOndaTres == 0){
            clearInterval(intervaloOndaTres);
            intervaloOndaTres = null;
            maxOndaTres = 6;
            playerAtaqueTime = true;
            ataqueAcontecendo = false;
        }
        maxOndaTres --;
        const criarNovoQuadrado = () => {
          const quadrado = document.createElement('div');
          quadrado.classList.add('quadrado');
          quadrado.style.left = `${Math.random() * 100}vw`;

          document.body.appendChild(quadrado);
      
          setTimeout(() => {
            quadrado.classList.add('vermelho');
            teiasDanosas.push(quadrado);
          }, 2000);
          
          setTimeout(() => {
            quadrado.classList.add('sair');
          }, 3000);
          
          setTimeout(() => {
            teiasDanosas.forEach((quadrado) => quadrado.remove());
            quadrado.remove();
          }, 4000);
        };
      
        for (let i = 0; i < 4; i++) {
          criarNovoQuadrado();
        }
    }
}

setInterval(()=>{
    if(playerAtaqueTime && bossVivo){
        bossEl.style.filter = 'none';
        hitBoxBoss.classList.add("specialcursor");

        setTimeout(()=>{
            hitBoxBoss.classList.remove("specialcursor");
            playerAtaqueTime = false;
        }, 10000);
    }
}, 100);

function criarProgeteis(gerarQuant){
    let margem = window.innerWidth/(gerarQuant+1);
    let posLeft = window.innerWidth/(gerarQuant+1);
    for (let i = 0; i < gerarQuant; i++) {
        const progetil = document.createElement("div");
        progetil.classList.add("progetil");
    
        progetil.style.left = `${posLeft}px`;
        progetil.style.top = `0px`;
        campoGeracao.appendChild(progetil);
        progeteis.push(progetil);
        posLeft += margem;
    }
    setTimeout(()=> dispararProgeteis(), 500); 
}

function dispararProgeteis(){
    let topProgeteis = 0;
    let progeteisCaindo = setInterval(()=>{progeteisEstaoCaindo = true;
        if(topProgeteis < window.innerHeight * 0.7){
            progeteis.forEach((progetil) =>{
                progetil.style.top = `${topProgeteis}px`;
            });
            topProgeteis += 20;

            if(detectaColisaoVetor(hitBoxPlayer, progeteis) &&tomarDano){
                darDanoJogador();
            }
        }
        else{
            progeteis.forEach((progetil) => progetil.remove());
            progeteisEstaoCaindo = false;
            clearInterval(progeteisCaindo);
        }
    },50);
}

function criarBolas(){
    const novaBola = document.createElement("div");
    novaBola.classList.add("bola");
    bolasGeracao.appendChild(novaBola);
    bolas.push(novaBola);

    let bolaAndando = setInterval(function(){
        let posY = (window.innerHeight * 0.7) * Math.sin(posYBolas) + (window.innerHeight/2);
        novaBola.style.top = `${posY}px`;
        novaBola.style.left = `${posXBolas}px`;

        if(detectaColisaoUnica(hitBoxPlayer, novaBola) &&tomarDano){
            darDanoJogador();
        }
        
        posXBolas += 30;
        posYBolas += 0.3;
        if(posYBolas == (Math.PI * 2)){
            posYBolas = 0;
        }
        if(posXBolas >= limiteXtela){
            novaBola.remove();
            posXBolas = 0;
            posYBolas = 0;
            bolasEstaoVoando = false;
            clearInterval(bolaAndando);   
        }
        
    }, 100);
}

let xRolas = 0;
let anguloRolas = 0;
let velocidadeXRola = 1;
function criarRolas(){
    const rolante = document.createElement("div");
    rolante.classList.add("rola");
    rolantesGeracao.appendChild(rolante);

    let rolando = setInterval(function(){
        xRolas += velocidadeXRola;
        anguloRolas += 15;

        if(xRolas >= limiteXtela){
            rolante.remove();
            xRolas = 0;
            anguloRolas = 0;
            velocidadeXRola = 1;
            bolasEstaoRolando = false;
            clearInterval(rolando);
        }
        if(velocidadeXRola < 45){
            velocidadeXRola += 6;
        }
        rolante.style.transform = `translateX(${xRolas}px) rotate(${anguloRolas}deg)`;

        if(detectaColisaoUnica(hitBoxPlayer, rolante) &&tomarDano){
            darDanoJogador();
        }

    } ,100);    
}


let intervaloDanos = setInterval(()=>{
    if(detectaColisaoUnica(hitBoxPlayer, minionEsquerda) &&tomarDano){
        darDanoJogador();
    }
    if(detectaColisaoUnica(hitBoxPlayer, minionDireita) &&tomarDano){
        darDanoJogador();
    }
    if(detectaColisaoVetor(hitBoxPlayer, teiasDanosas) &&tomarDano){
        darDanoJogador();
    }
}, 100);

hitBoxBoss.addEventListener('click', ()=>{
    if(vidaBoss <= 150 * 0.3){
        trilhaSonora.playbackRate = 1.3;
        background.style.backgroundImage = `url("assets/Arac-Boss/arac-wall-damage.svg")`;
    }
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

  
  
