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
function aparecerTexto() {
    setTimeout(() => {
        nomeBossEl.style.opacity = "1";
    }, 1000);
    setTimeout(() => {
        nomeBossEl.style.opacity = "0";
        textoApareceu = true;
    }, 4000);
}
aparecerTexto();

setInterval(() => {
    if (textoApareceu && !ataqueAcontecendo) {
        proximaFase = Math.floor(Math.random() * 3) + 1;

        if (proximaFase == 1) {
            bossEl.style.border = "red 5px solid";
            ataqueAcontecendo = true;
            setTimeout(onda1, 1500);
        }
        if (proximaFase == 2) {
            bossEl.style.border = "blue 5px solid";
            ataqueAcontecendo = true;
            setTimeout(onda2, 1500);
        }
        if (proximaFase == 3) {
            bossEl.style.border = "green 5px solid";
            ataqueAcontecendo = true;
            setTimeout(onda3, 1500);
        }
    }
}, 1000);

let bolRolantes = false;
let bolBolas = false;
let bolProgeteis = false;

let intervalos = []; // Para armazenar os IDs dos intervalos

function onda1() {
    iniciarAtaque();
}

function onda2() {
    iniciarAtaque();
}

function onda3() {
    iniciarAtaque();
}

function iniciarAtaque() {
    ataqueAcontecendo = true;

    // Intervalo para projéteis
    let intervaloProjeteis = setInterval(() => {
        if (!bolProgeteis) {
            bolProgeteis = true;
            let randomNumber = Math.floor(Math.random() * 6) + 2;
            setTimeout(criarProgeteis, 800, randomNumber);
        }
    }, 500);
    intervalos.push(intervaloProjeteis);

    // Intervalo para bolas
    let intervaloBolas = setInterval(() => {
        if (!bolBolas) {
            bolBolas = true;
            setTimeout(() => {
                criarBolas();
            }, 5000);
        }
    }, 2000);
    intervalos.push(intervaloBolas);

    // Intervalo para objetos rolantes
    let intervaloRolantes = setInterval(() => {
        if (!bolRolantes) {
            bolRolantes = true;
            setTimeout(() => {
                criarRolas();
            }, 2000);
        }
    }, 500);
    intervalos.push(intervaloRolantes);

    // Após 15 segundos, limpar todos os intervalos e resetar o estado
    setTimeout(() => {
        intervalos.forEach(clearInterval); // Limpa todos os intervalos armazenados
        intervalos = []; // Limpa o array de IDs
        ataqueAcontecendo = false; // Permitir chamar outra onda
        bolProgeteis = false;
        bolBolas = false;
        bolRolantes = false; // Resetar os estados, se necessário
    }, 15000);
}

// Criação de projéteis
function criarProgeteis(gerarQuant) {
    // Evita criar projéteis se já estiverem sendo lançados
    if (bolProgeteis) return;

    bolProgeteis = true; // Bloqueia novos disparos enquanto os atuais estão em execução

    let margem = window.innerWidth / (gerarQuant + 1);
    let posLeft = window.innerWidth / (gerarQuant + 1);
    for (let i = 0; i < gerarQuant; i++) {
        const progetil = document.createElement("div");
        progetil.classList.add("progetil");
        progetil.style.left = `${posLeft}px`;
        progetil.style.top = `0px`;
        campoGeracao.appendChild(progetil);
        posLeft += margem;
    }
    setTimeout(dispararProgeteis, 500);
}

function dispararProgeteis() {
    let topProgeteis = 0;
    let progeteisCaindo = setInterval(() => {
        document.querySelectorAll(".progetil").forEach((progetil) => {
            progetil.style.top = `${topProgeteis}px`;
            if (parseInt(progetil.style.top) >= window.innerHeight * 0.99) {
                progetil.remove();
            }
        });
        topProgeteis += 20;
        if (topProgeteis >= window.innerHeight * 0.99) {
            clearInterval(progeteisCaindo); // Para o movimento
            bolProgeteis = false; // Permite criar outra onda de projéteis
        }
    }, 50);
}


// Criação de bolas
function criarBolas() {
    const novaBola = document.createElement("div");
    novaBola.classList.add("bola");
    bolasGeracao.appendChild(novaBola);

    let posXBolas = 0; 
    let posYBolas = 0;

    let bolaAndando = setInterval(function () {
        let posY = 150 * Math.sin(posYBolas) + window.innerHeight / 2;
        novaBola.style.top = `${posY}px`;
        novaBola.style.left = `${posXBolas}px`;

        posXBolas += 40;
        posYBolas += 0.5;

        if (posXBolas >= window.innerWidth * 0.99) {
            novaBola.remove();
            clearInterval(bolaAndando);
            bolBolas = false;
        }
    }, 100);
}

// Criação de rolantes
function criarRolas() {
    const rolante = document.createElement("div");
    rolante.classList.add("rola");
    rolantesGeracao.appendChild(rolante);

    let xRolas = 0;
    let anguloRolas = 0;
    let velocidadeXRola = 1;

    const rolando = setInterval(function () {
        xRolas += velocidadeXRola;
        anguloRolas += 5;

        rolante.style.transform = `translateX(${xRolas}px) rotate(${anguloRolas}deg)`;

        if (xRolas >= window.innerWidth * 0.99) {
            rolante.remove();
            clearInterval(rolando);
            bolRolantes = false;
        }

        if (velocidadeXRola < 45) {
            velocidadeXRola += 6;
        }
    }, 100);
}
