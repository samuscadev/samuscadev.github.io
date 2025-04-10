const blocoEl = document.querySelector("#bloco");
const blocaoEl = document.querySelector("#blocao");
const spriteblocoEl = document.querySelector("#bloco img");
blocaoEl.style.backgroundImage = `url("assets/backgrounds/bota1.png")`;

let posX = 0;
let posY = 0;
let intervalID = null;
let animacaoCorrer = null;
let indiceCorrida = 0;

let protagonistaRun = [
    "assets/protagonista-run1.png",
    "assets/protagonista-run2.png",
    "assets/protagonista-run3.png",
    "assets/protagonista-run4.png",
];

function andar(deltaX, deltaY) {
    if (estaContido(blocoEl, blocaoEl)) {
        posX += deltaX * 10;
        posY += deltaY * 10;

        if (deltaX == 1) {
            blocoEl.style.transform = "scaleX(1)";
        } else if (deltaX == -1) {
            blocoEl.style.transform = "scaleX(-1)";
        }
        if (deltaY == -1) {
            spriteblocoEl.src = "assets/protagonista-virado-atras.png";
        }
        if (deltaY == 1) {
            spriteblocoEl.src = "assets/protagonista-virado-frente.png";
        }

        blocoEl.style.transform = `translate(${posX}px, ${posY}px) scaleX(${deltaX < 0 ? -1 : 1})`;
    } else {
        posX += deltaX * -10;
        posY += deltaY * -10;

        blocoEl.style.transform = `translate(${posX}px, ${posY}px)`;
        clearInterval(intervalID);
        intervalID = null;
    }
}

function animarCorrida() {
    spriteblocoEl.src = protagonistaRun[indiceCorrida];
    indiceCorrida = (indiceCorrida + 1) % protagonistaRun.length; // Cicla os índices
}

document.addEventListener("keydown", (event) => {
    if (intervalID) return; // Evita múltiplos intervals para movimento

    switch (event.key) {
        case "ArrowRight":
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 175); // Troca os sprites a cada 200ms
            intervalID = setInterval(() => andar(1, 0), 50);
            break;
        case "ArrowLeft":
            if (!animacaoCorrer) animacaoCorrer = setInterval(animarCorrida, 175);
            intervalID = setInterval(() => andar(-1, 0), 50);
            break;
        case "ArrowUp":
            intervalID = setInterval(() => andar(0, -1), 50);
            spriteblocoEl.src = "assets/protagonista-virado-atras.png";
            break;
        case "ArrowDown":
            intervalID = setInterval(() => andar(0, 1), 50);
            spriteblocoEl.src = "assets/protagonista-virado-frente.png";
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowRight":
        case "ArrowLeft":
            clearInterval(animacaoCorrer); // Para a animação horizontal
            animacaoCorrer = null;
            spriteblocoEl.src = "assets/protagonista.png"; // Reseta o sprite
            break;
    }

    clearInterval(intervalID); // Para o movimento geral
    intervalID = null;

    indiceCorrida = 0; // Reseta o índice da animação
});

