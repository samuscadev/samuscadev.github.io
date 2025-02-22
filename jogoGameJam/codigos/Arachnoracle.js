
const playerEl = document.querySelector("#bloco");
const limiteTam = window.innerWidth - 10;
const limiteXtela = window.innerWidth * 0.998;
const chao = document.querySelector("#piso");
const canhao = document.querySelector("#cannon");
const hitBoxPlayer = document.querySelector("#hit-box");
const hitBoxBoss = document.querySelector("#boss-hit-box");
let campoGeracao = document.querySelector("#progeteis");
let bossEl = document.querySelector("#boss");
let bossSprite = document.querySelector("#boss img");
let bolasGeracao = document.querySelector("#bolas");
let rolantesGeracao = document.querySelector("#rolantes");
const trilhaSonora = document.getElementById("soundtrack");
let posYBolas = 0;
let posXBolas = 0;
let proximaFase;
let textoApareceu = false;
let ataqueAcontecendo = false;
let playerAtaqueTime = false;
let vida = vidasJogador;
let vidaBoss = 150;

function tocarMusica() {
    trilhaSonora.volume = 0.7;
    trilhaSonora.play();
}

let chaoSprites = [
    "assets/arac-floor.svg",
    "assets/arac-floor-off.svg"
];
let indiceChao = 0;
function animarChao() {
    chao.style.backgroundImage = `url(${chaoSprites[indiceChao]})`;
    indiceChao = (indiceChao + 1) % chaoSprites.length;
}

setInterval(animarChao, 333);

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

setInterval(() => {
    if (textoApareceu && !ataqueAcontecendo && !playerAtaqueTime) {
        let proximaFase;
        do {
            proximaFase = Math.floor(Math.random() * 3) + 1;
        } while (proximaFase === ultimoNumero);

        ultimoNumero = proximaFase;
        ataqueAcontecendo = true;

        if (proximaFase === 1) {
            setTimeout(onda1, 1500);
        }
        if (proximaFase === 2) {
            setTimeout(onda2, 1500);
        }
        if (proximaFase === 3) {
            setTimeout(onda3, 1500);
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
                    canhao.src = "assets/super-spider-cannon-cuspindo.svg";
                }, 700);
                setTimeout(criarRolas, 1000);
                setTimeout(() => {
                    canhao.src = "assets/super-spider-cannon.svg";
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
const minionEsquerda = document.querySelector("#minionEsq");
const minionDireita = document.querySelector("#minionDir");
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
    intervaloOndaTres =  setInterval(criarQuadrados, 5000);

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
          }, 4000);
          
          setTimeout(() => {
            teiasDanosas.forEach((quadrado) => quadrado.remove());
            quadrado.remove();
          }, 5000);
        };
      
        for (let i = 0; i < 4; i++) {
          criarNovoQuadrado();
        }
    }
}

setInterval(()=>{
    if(playerAtaqueTime){
        bossSprite.src = "assets/arac-damage-time.svg";
        bossEl.style.filter = 'none';
        hitBoxBoss.classList.add("specialcursor");

        setTimeout(()=>{
            bossSprite.src = "assets/arac-base.svg"
            bossEl.style.filter = 'brightness(70%) blur(1px)';
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
                coracoes[0].remove();
                coracoes.splice(0, 1);
                tomarDano = false;
                playerEl.classList.add('piscando');
                setTimeout(()=>{
                    playerEl.classList.remove('piscando');
                    tomarDano = true;
                }, 3000);
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
            coracoes[0].remove();
            coracoes.splice(0, 1);
            tomarDano = false;
            playerEl.classList.add('piscando');
            setTimeout(()=>{
                playerEl.classList.remove('piscando');
                tomarDano = true;
            }, 3000);
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
            coracoes[0].remove();
            coracoes.splice(0, 1);
            tomarDano = false;
            playerEl.classList.add('piscando');
            setTimeout(()=>{
                playerEl.classList.remove('piscando');
                tomarDano = true;
            }, 3000);
        }

    } ,100);    
}


setInterval(()=>{

    if(detectaColisaoUnica(hitBoxPlayer, minionEsquerda) &&tomarDano){
        coracoes[0].remove();
        coracoes.splice(0, 1);
        tomarDano = false;
        playerEl.classList.add('piscando');
        setTimeout(()=>{
            playerEl.classList.remove('piscando');
            tomarDano = true;
        }, 3000);
    }
    if(detectaColisaoUnica(hitBoxPlayer, minionDireita) &&tomarDano){
        coracoes[0].remove();
        coracoes.splice(0, 1);
        tomarDano = false;
        playerEl.classList.add('piscando');
        setTimeout(()=>{
            playerEl.classList.remove('piscando');
            tomarDano = true;
        }, 3000);
    }

    if(detectaColisaoVetor(hitBoxPlayer, teiasDanosas) &&tomarDano){

        console.log("Deu dano");
        coracoes[0].remove();
        coracoes.splice(0, 1);
        tomarDano = false;
        playerEl.classList.add('piscando');
        setTimeout(()=>{
            playerEl.classList.remove('piscando');
            tomarDano = true;
        }, 3000);
    }

    if (coracoes.length === 0) {
        playerAtaqueTime = false;
        ataqueAcontecendo = true;
        window.alert("tu morreu, mas eu n fiz essa tela tó com preguiça :( dá um f5 ae");
    }

}, 100);

const mostraVidaBoss = document.querySelector("#vida-boss");
hitBoxBoss.addEventListener('click', ()=>{
    if(playerAtaqueTime){
        vidaBoss --;
        bossSprite.src = "assets/arac-damage.svg";
        bossSprite.style.filter = "contrast(50%)";
        mostraVidaBoss.innerHTML = `${vidaBoss}`;

        setTimeout(()=>{
            bossSprite.style.filter = "contrast(100%)";
            bossSprite.src = "assets/arac-damage-time.svg";
        }, 500);
    }
    
    if(vidaBoss <= 0){
        playerAtaqueTime = false;
        ataqueAcontecendo = true;
        window.alert("O boss morreu, eu n fiz essa tela tó com preguiça :( da um f5 ae");
    }
  });

  
  
