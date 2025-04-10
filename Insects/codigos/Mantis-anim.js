
//animação do chão
// bossSprite.src = "assets/Arac-Boss/arac-onda1.svg";
let spritesReiGuerreiro = [
    "assets/Mantis-Boss/kingMantis-0.svg",
    "assets/Mantis-Boss/kingMantis-1.svg",
    "assets/Mantis-Boss/kingMantis-2.svg",
];


let indiceRei = 0;

let sobe = false;
function animarSabiosVoadores(){
    if(!sobe){
        sabioUm.style.top = '12vh';
        sabioDois.style.top = '12vh';
        sobe = true;
    }
    else{
        sabioUm.style.top = '8vh';
        sabioDois.style.top = '8vh';
        sobe = false;
    }
}
setInterval(animarSabiosVoadores, 500);

function animarReiGuerreiro() {
    rei.src = `${spritesReiGuerreiro[indiceRei]}`;
    indiceRei = (indiceRei + 1) % spritesReiGuerreiro.length;
}
setInterval(animarReiGuerreiro, 150);



let intervaloAnimacoesAranha = setInterval(()=>{
        if(!bossVivo){
            bossSprite.src = "assets/Arac-Boss/arac-died.svg";
        }
        else if(ataqueAcontecendo){
            if(ondaAtual == 1){
                bossSprite.src = "assets/Arac-Boss/arac-onda1.svg";
            }
            if(ondaAtual == 2){
                bossSprite.src = "assets/Arac-Boss/arac-onda2.svg";
            }
            if(ondaAtual == 3){
                bossSprite.src = "assets/Arac-Boss/arac-onda3.svg";
            }
        }
        else {
            if(playerAtaqueTime){
                console.log("era pra ser tenso");
            }
        }
}, 500);