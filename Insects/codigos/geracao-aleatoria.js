
const limiteTam = 550; //tamanha do blocao - tamanho do bloquin
let rngFixe = Math.floor(Math.random() * 5)+ 1;
console.log(rngFixe);


for (let i = 0; i < rngFixe; i++) {
    const bloquinhoRandom = document.createElement("div");
    bloquinhoRandom.classList.add("random-bloco");

    let rngTop = Math.floor(Math.random() * limiteTam);
    let rngLeft = Math.floor(Math.random() * limiteTam);
    bloquinhoRandom.style.top = `${rngTop}px`;
    bloquinhoRandom.style.left = `${rngLeft}px`;
    blocaoEl.appendChild(bloquinhoRandom);
}

let bloquinhosRandoms = document.querySelectorAll(".random-bloco");


