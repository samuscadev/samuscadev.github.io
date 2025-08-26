const bandeiras = [
    "Sprites/flags/1.png",
    "Sprites/flags/2.png",
    "Sprites/flags/3.png",
    "Sprites/flags/4.png",
    "Sprites/flags/5.png"
]
const BANDEIRA_MOSTRADA = document.getElementById("flag-choose");
let bandeira_Alvo = BANDEIRA_MOSTRADA.src;
console.log(bandeira_Alvo)
let index_flag = 0;

function trocarbandeira(){
    BANDEIRA_MOSTRADA.src = bandeiras[index_flag]
    bandeira_Alvo = bandeiras[index_flag];
    console.log(bandeira_Alvo)
    if(index_flag == bandeiras.length - 1){
        index_flag = 0;
    }
    else{
        index_flag ++;
    }
}

function validar() {
            const nome = document.getElementById("nome").value.trim();
            const nomeImperio = document.getElementById("impNome").value.trim();
            if (nome === "") {
                alert("Por favor coloque um nome!");
                return;
            }
            if(nomeImperio == ""){
                alert("Por favor, nomeie seu império!");
                return;
            }
            else{
                criarDados(nome, nomeImperio, bandeira_Alvo);
                window.location.replace("game.html");
            }
}


