
let dicasInciais = [ "Você pode clicar nas setas 'Esquerda' e 'Direita' pra mover",
                    "Você pode Pular usando apertando 'Espaço'",
                    "Clique no Inimigo para atirar",
                    "Ei!, você parece estar em um sonho"   
];


let comecarCheck = false;
let andarCheck = false;
let pularCheck = false;
let inimigoAparecerCheck = false;
let inimigoDerrotadoCheck = false;
let dicasTutorialEl = document.querySelector("#dica");

const botaoPrincipalEl = document.querySelector("#botao-start");
const playerTutorialEl = document.querySelector("#player-tutorial");

let posXTutorial = 0;
let posYTutorial = window.innerHeight * 0.7;

//caindo
botaoPrincipalEl.addEventListener('click', function () {
    botaoPrincipalEl.style.display = `none`;
    playerTutorialEl.style.display = `inline`;
    playerTutorialEl.style.position = `absolute`;
    playerTutorialEl.style.top = `0px`;
    playerTutorialEl.style.left = `0px`;
    dicasTutorialEl.innerHTML = `<p>${dicasInciais[0]}</p>`;

    let index = 0;
    const limite = window.innerHeight * 0.7;
    const intervalo = setInterval(() => {
        if (index >= limite) {
            clearInterval(intervalo);
            comecarCheck = true;
        } else {
            index += 20;
            playerTutorialEl.style.top = `${index}px`;
        }
    }, 70);
});

//andando
document.addEventListener('keydown', function (event) {
    if (!comecarCheck) return;

    switch (event.key) {
        case 'ArrowLeft':
            posXTutorial -= 40;
            playerTutorialEl.style.left = `${posXTutorial}px`;
            andarCheck = true;
            break;

        case 'ArrowRight':
            posXTutorial += 40;
            playerTutorialEl.style.left = `${posXTutorial}px`;
            andarCheck = true;
            break;
    }
});
//pulando
document.addEventListener('keydown', function (event) {
    if (!andarCheck) return;

    if (event.code === 'Space' && !pularCheck) {
        let alturaMax = 150;
        let altura = 0;
        let indoParaCima = true;
        pularCheck = true;

        const pulinho = setInterval(() => {
            if (indoParaCima) {
                if (altura < alturaMax) {
                    altura += 50;
                    posYTutorial -= 50;
                    playerTutorialEl.style.top = `${posYTutorial}px`;
                } else {
                    indoParaCima = false;
                }
            } else {
                if (altura > 0) {
                    altura -= 50;
                    posYTutorial += 50;
                    playerTutorialEl.style.top = `${posYTutorial}px`;
                } else {
                    pularCheck = false;
                    inimigoAparecerCheck = true;
                    clearInterval(pulinho);
                }
            }
        }, 70);
    }
});

let inimigoTutorialEl = document.querySelector("#inimigo-tutorial");

const verificarInimigo = setInterval(() => {
    if (inimigoAparecerCheck) {
        inimigoTutorialEl.style.display = `inline`;
        clearInterval(verificarInimigo);
    }
}, 500);

let cliquesNoInimigo = 0;
let portalTutorialEl = document.querySelector("#portal-tutorial");
inimigoTutorialEl.addEventListener('click', function(){
    cliquesNoInimigo++;
    console.log(cliquesNoInimigo);
    if(cliquesNoInimigo == 10){
        inimigoDerrotadoCheck = true;
        portalTutorialEl.style.display = `inline`;
        inimigoTutorialEl.style.display = `none`;
    }
})

function detectarColisaoTutorial(el1, el2) {
    const rect1 = el1.getBoundingClientRect(); // Obtém dimensões do primeiro elemento
    const rect2 = el2.getBoundingClientRect(); // Obtém dimensões do segundo elemento

    return !(
        rect1.right < rect2.left ||  // Verifica se está à esquerda
        rect1.left > rect2.right || // Verifica se está à direita
        rect1.bottom < rect2.top || // Verifica se está acima
        rect1.top > rect2.bottom    // Verifica se está abaixo
    );
}

function verificarColisao() {
    if (detectarColisaoTutorial(playerTutorialEl, portalTutorialEl)) {
        portalTutorialEl.style.border = `2px white solid`;
        console.log("sim");
    } else {
        portalTutorialEl.style.border = `none`;
    }
    requestAnimationFrame(verificarColisao); // Continua verificando
}
verificarColisao();

let c1 = true;
let c2 = true;
let c3 = true;
let c4 = true;

function atualizarTexto(){
    if(comecarCheck && c1){
        dicasTutorialEl.innerHTML = `<p>${dicasInciais[0]}</p>`;
        c1 = false;
    }
    if(andarCheck && c2){
        dicasInciais.splice(0, 1);
        dicasTutorialEl.innerHTML = `<p>${dicasInciais[0]}</p>`;
        c2 = false;
    }
    if(pularCheck && c3){
        dicasInciais.splice(0, 1);
        dicasTutorialEl.innerHTML = `<p>${dicasInciais[0]}</p>`;
        c3 = false;
    }
    if(inimigoDerrotadoCheck && c4){
        dicasInciais.splice(0, 1);
        dicasTutorialEl.innerHTML = `<p>${dicasInciais[0]}</p>`;
        c4 = false;
    }
}

setInterval(atualizarTexto, 500);