const limiteTam = window.innerWidth - 10; // Tamanho da janela - tamanho do projétil
let campoGeracao = document.querySelector("#progeteis");
let bolasGeracao = document.querySelector("#bolas")
let quantidadeDeProgeteis = 8;
let posYBolas = 0;
let posXBolas = 0;

function criarProgeteis(gerarQuant){
    let margem = window.innerWidth/(gerarQuant+1);
    let posLeft = 0;
    for (let i = 0; i < gerarQuant; i++) {
        const progetil = document.createElement("div");
        progetil.classList.add("progetil");
    
        progetil.style.left = `${posLeft}px`;
        progetil.style.top = `0px`;
        campoGeracao.appendChild(progetil);
        posLeft += margem;
    }
    
    let progeteis = document.querySelectorAll(".progetil");
}
criarProgeteis(quantidadeDeProgeteis);

function criarBolas(){
    const novaBola = document.createElement("div");
    novaBola.classList.add("bola");
    bolasGeracao.appendChild(novaBola);

    setInterval(function(){
        let posY = 50 * Math.sin(posYBolas) + (window.innerHeight/2);
        novaBola.style.top = `${posY}px`;
        novaBola.style.left = `${posXBolas}px`;
        posXBolas += 30;
        posYBolas ++;
        if(posXBolas == 780){
            posXBolas = 0;
        }
        if(posYBolas == (Math.PI * 2)){
            posYBolas = 0;
        }
    }, 100);
}

criarBolas();



