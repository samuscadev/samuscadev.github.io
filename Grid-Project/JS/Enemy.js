class Inimigo{
    constructor(elemento, vida, defesa, ataque){
        this.elemento = elemento;
        this.vida = vida;
        this.defesa = defesa;
        this.ataque = ataque;

        this.modoAlerta();
    }

    getPosicao() {
        return {
        x: parseInt(this.elemento.style.gridRow),
        y: parseInt(this.elemento.style.gridColumn)
        };
    }

    modoAlerta(){
        let jogador = getObjectPlayer();
        let indoAtacar = false;

        setInterval(()=>{
            if(colisionGrid(jogador.getElemento(), this.elemento)){
                if(!indoAtacar){
                    indoAtacar = true;
                    this.modoAtaque();
                }
            }
            else{
                indoAtacar = false;
            }
        }, 100);
    }

    modoAtaque(){
        console.log("Entrou em modo de ataque!");
        atualizarContador(5);
    }

    sofrerDano(dano){
        let danoTotal = dano - this.defesa >= 0 ? dano - this.defesa : randomInt(1, 4);
        this.vida -= danoTotal;
        if(this.vida <= 0){
            morrer();
        }  
    }

    morrer(){
        this.elemento.remove();
    }
}

function gerarInimigos(qntd) {
    const maxInimigos = 10;
    const quantidade = Math.min(qntd, maxInimigos);

    const posicoesOcupadas = [];

    for (let i = 0; i < quantidade; i++) {
        let novoInimigoEl = document.createElement("img");
        novoInimigoEl.classList.add("inimigo", "tamPadrao");
        novoInimigoEl.src = "Sprites/ground/enemy_1.svg";

        let cordX, cordY;
        let posValida = false;

        while (!posValida) {
            cordX = randomInt(1, 5);
            cordY = randomInt(1, 5);
            posValida = !posicoesOcupadas.some(pos => pos.x === cordX && pos.y === cordY);
        }

        posicoesOcupadas.push({ x: cordX, y: cordY });

        posicionarGrid(novoInimigoEl, cordX, cordY);
        let novoInimigo = new Inimigo(novoInimigoEl, 100, 10, 10);
        fixarAoConteiner(novoInimigoEl);
    }
}

gerarInimigos(3);
