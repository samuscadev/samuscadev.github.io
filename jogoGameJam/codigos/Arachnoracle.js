const limiteTam = window.innerWidth - 10; // Tamanho da janela - tamanho do projétil
let campoGeracao = document.querySelector("#progeteis");
let bossEl = document.querySelector("#boss");
let bolasGeracao = document.querySelector("#bolas");
let rolantesGeracao = document.querySelector("#rolantes");
let quantidadeDeTiros = 10;
let posYBolas = 0;
let posXBolas = 0;
let proximaFase;
let textoApareceu = false;
let ataqueAcontecendo = false;

let nomeBossEl = document.querySelector("#nome-boss");
function aparecerTexto(){
    setTimeout(()=>{
        nomeBossEl.style.opacity = "1";
    } , 1000);
    setTimeout(()=>{
        nomeBossEl.style.opacity = "0";
        textoApareceu = true;
    } , 4000);
    
}
aparecerTexto();
/*
setInterval(()=>{
    if(textoApareceu && !ataqueAcontecendo){
        proximaFase = Math.floor(Math.random() * 3)+ 1;

        if(proximaFase == 1){
            bossEl.style.backgroundColor = "red";
            ataqueAcontecendo = true;
        }
        if(proximaFase == 2){
            bossEl.style.backgroundColor = "blue";
            ataqueAcontecendo = true;
        }
        if(proximaFase == 3){
            bossEl.style.backgroundColor = "green";
            ataqueAcontecendo = true;
        }
    }
}, 100);*/

setTimeout(onda1, 1000);

function onda1(){
    setTimeout(() => criarProgeteis(2), 500);
    setTimeout(() => criarBolas(), 1500);
    setTimeout(() => criarProgeteis(3), 2500);
    setTimeout(() => criarRolas(), 3000);
    setTimeout(() => criarProgeteis(4), 4500);
    setTimeout(() => criarProgeteis(6), 7500);
    setTimeout(() => criarRolas(), 10000);
    setTimeout(() => criarBolas(), 11000);
    setTimeout(() => criarProgeteis(2), 12500);
    setTimeout(() => criarBolas(), 14500);
    setTimeout(() => criarProgeteis(3), 15500);
    setTimeout(() => criarRolas(), 14500);
    setTimeout(() => criarProgeteis(4), 17500);
    setTimeout(() => criarProgeteis(6), 20500);
    setTimeout(() => criarRolas(), 19500);
    setTimeout(() => criarBolas(), 19500);
}
function onda2(){
    
}
function onda3(){
    
}
let coracoes = [];
let progeteis = [];
let bolas = [];
const campoCoracoes = document.querySelector("#coracoes");
for(let i=0; i<6; i++){
    const novoCoracao = document.createElement("img");
    coracoes.push(novoCoracao);
    novoCoracao.classList.add("icone-coracao");
    novoCoracao.src = "assets/heart-icon.png";
    campoCoracoes.appendChild(novoCoracao);
}


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
    let progeteisCaindo = setInterval(()=>{
        if(topProgeteis < window.innerHeight * 0.7){
            progeteis.forEach((progetil) =>{
                progetil.style.top = `${topProgeteis}px`;
            });
            topProgeteis += 20;
        }
        else{
            progeteis.forEach((progetil) => progetil.remove());
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
        let posY = 150 * Math.sin(posYBolas) + (window.innerHeight/2);
        novaBola.style.top = `${posY}px`;
        novaBola.style.left = `${posXBolas}px`;
        
        posXBolas += 40;
        posYBolas += 0.5;
        if(posYBolas == (Math.PI * 2)){
            posYBolas = 0;
        }
        if(posXBolas >= window.innerWidth * 0.998){
            novaBola.remove();
            posXBolas = 0;
            posYBolas = 0;
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
        anguloRolas += 5;

        if(xRolas >= window.innerWidth * 0.998){
            rolante.remove();
            xRolas = 0;
            anguloRolas = 0;
            velocidadeXRola = 1;
            clearInterval(rolando);
        }
        if(velocidadeXRola < 45){
            velocidadeXRola += 6;
        }
        rolante.style.transform = `translateX(${xRolas}px) rotate(${anguloRolas}deg)`;

    } ,100);    
}
