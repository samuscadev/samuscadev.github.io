const imgMorcegoEl = document.querySelector('#morcegu');
const imgFlorEl = document.querySelector('#flor');

//iniciais: top: 85px; right: 5px;
function cicloMorcego() {
    setTimeout(() => {
        imgMorcegoEl.style.right = '5px';
        imgMorcegoEl.style.top = '50px';
    }, 0); // Mova para 50px imediatamente ao iniciar a função
    setTimeout(() => {
        imgMorcegoEl.style.right = '25px';
        imgMorcegoEl.style.top = '80px';
    }, 250);

    setTimeout(() => {
        imgMorcegoEl.style.right = '25px';
        imgMorcegoEl.style.top = '120px';
    }, 500); // Mova para 120px após 500ms
    setTimeout(() => {
        imgMorcegoEl.style.right = '5px';
        imgMorcegoEl.style.top = '120px';
    }, 900); // Mova para 120px após 500ms
    setTimeout(() => {
        imgMorcegoEl.style.right = '5px';
        imgMorcegoEl.style.top = '80px';
    }, 950);
}

function superCego() {
    setTimeout(() => {
        imgMorcegoEl.style.filter = 'brightness(1000%) blur(2px)';
    }, 0);
    setTimeout(() => {
        imgMorcegoEl.style.top = '-150px';
    }, 500);
    setTimeout(() => {
        imgMorcegoEl.style.top = '85px';
        imgMorcegoEl.style.filter = 'brightness(100%)';
    }, 2500);
}

// Defina o intervalo para 1000ms (1 segundo) para repetir o ciclo
setInterval(cicloMorcego, 1000);
setInterval(superCego, 8000);

function bixinhaEstruchipada() {
    setTimeout(() => {
        imgFlorEl.style.right = '2px';
    }, 0);
    setTimeout(() => {
        imgFlorEl.style.right = '-120px';
    }, 500);
    setTimeout(() => {
        imgFlorEl.style.right = '5px';
    }, 1500);
}
function inverteFlor() {
    
    setTimeout(() => {
        imgFlorEl.style.transform = 'scaleX(-1)'; // Inverte horizontalmente
    }, 0);
    setTimeout(() => {
        imgFlorEl.style.transform = 'scaleX(1)'; // Volta ao normal após 950ms
    }, 950);
}

// Repetir a função inverteFlor a cada segundo
setInterval(inverteFlor, 1000);
setInterval(bixinhaEstruchipada, 5000);