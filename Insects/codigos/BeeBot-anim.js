
//animação do chão
// bossSprite.src = "assets/Arac-Boss/arac-onda1.svg";

let chaoSprites = [
    "assets/BeeBoot-Boss/bee-floor.svg",
    "assets/BeeBoot-Boss/bee-floor.svg"
];
let indiceChao = 0;
function animarChao() {
    chao.style.backgroundImage = `url(${chaoSprites[indiceChao]})`;
    indiceChao = (indiceChao + 1) % chaoSprites.length;
}
setInterval(animarChao, 1000);


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