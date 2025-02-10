
function estaContido(el1, el2) {
    const hit1 = el1.getBoundingClientRect();
    const hit2 = el2.getBoundingClientRect();

    return (
        hit1.left >= hit2.left &&
        hit1.right <= hit2.right &&
        hit1.top >= hit2.top &&
        hit1.bottom <= hit2.bottom
    );
}
function detectaColisaoUnica(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||   // obj1 está à esquerda de obj2
        rect1.left > rect2.right ||  // obj1 está à direita de obj2
        rect1.bottom < rect2.top ||  // obj1 está acima de obj2
        rect1.top > rect2.bottom     // obj1 está abaixo de obj2
    );
}

function detectaColisaoVetor(playerEl, blocos) {
    const playerhit = playerEl.getBoundingClientRect();

    for (let bloco of blocos) {
        const blocohit = bloco.getBoundingClientRect();

        if (
            playerhit.left < blocohit.right &&
            playerhit.right > blocohit.left &&
            playerhit.top < blocohit.bottom &&
            playerhit.bottom > blocohit.top
        ) {
            console.log("Colisão detectada com:", bloco);
            return true;
        }
    }
    return false;
}

function estaDentroDaJanela(el) {
    if (!el) return false;

    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
