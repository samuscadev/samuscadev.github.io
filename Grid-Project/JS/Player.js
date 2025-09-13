class Player{
    constructor(vida, elemento, sprite) {
        this.vida = vida;
        this.elemento = elemento;
        this.sprite = sprite;

        this.inicializarElemento();
    }

    inicializarElemento() {
        this.elemento.src = this.sprite;
        this.elemento.classList.add("jogador", "tamPadrao");
        this.elemento.id = "jogador"; 
        posicionarGrid(this.elemento, 1, 1);
        fixarAoConteiner(this.elemento);
    }

    getElemento(){
        return this.elemento;
    }

    getPosicao() {
        return {
        x: parseInt(this.elemento.style.gridRow),
        y: parseInt(this.elemento.style.gridColumn)
        };
    }

    mover(x, y){
        this.elemento.style.gridRow = x;
        this.elemento.style.gridColumn = y;
        atualizarCoordenadas(parseInt(this.elemento.style.gridRow), parseInt(this.elemento.style.gridColumn));
    }
}

const JOGADOR_EL = document.createElement("img");   
let jogador = new Player(100, JOGADOR_EL, "Sprites/Player/base.svg");

function getObjectPlayer(){
    return jogador;
}




