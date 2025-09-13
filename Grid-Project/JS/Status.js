function mudarEstado(id){
    let button = document.getElementById("action-button")
    if(id == 0){
        button.innerHTML = `<button onclick="">Agir</button>`;
    } else if(id == 1){
        button.innerHTML = `<button onclick="">Coletar</button>`;
    } else if(id == 2){
        button.innerHTML = `<button onclick="">Atacar</button>`;
    }
}

function verificarAcaoInicial(){
    const QUADRADOS = document.querySelectorAll(".tiles");
    if(QUADRADOS[0].classList.contains("bau")){
        mudarEstado(1);
    } else {
        mudarEstado(0);
    }
}

verificarAcaoInicial();

function atualizarContador(tempo){
    const CONTADOR = document.getElementById("contagem-ataque");
    let intervalo = setInterval(()=>{
        CONTADOR.innerHTML = `${tempo}s`;
        tempo --;
        if(tempo <= 0){
            CONTADOR.innerHTML = `Inimigo Atacou!`;
            clearInterval(intervalo);
            resetarContador();
        }
    }, 1000);
}

function resetarContador(){
    const CONTADOR = document.getElementById("contagem-ataque");
    CONTADOR.innerHTML = `Fora de Combate!`;
}

function atualizarCoordenadas(x, y){
    const CORDS_EL = document.getElementById("coords");
    CORDS_EL.innerHTML = `X: ${x} <br> Y: ${y}`;
}

