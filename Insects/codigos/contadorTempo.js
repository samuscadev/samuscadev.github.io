
// variavel "globais de dungeons"
let segundos = 0;
let minutos = 0;
let base = 59;
let scorebasico = 0;

//atributos das estatisticas
let atrVidaPerdida = 0;
let atrBausAbertos = 0;
let atrInimigosDerrotados = 0;


let tempoCorrendo = setInterval(()=>{
    segundos ++;

    if(segundos == base){
        minutos ++;
        segundos = 0;
    }
}, 1000);

function cauculaScore(){
    
    if(minutos + atrVidaPerdida > 0){
        scorebasico = ((atrBausAbertos + atrInimigosDerrotados) * 10) / (minutos + atrVidaPerdida);
    }
    else{
        scorebasico = ((atrBausAbertos + atrInimigosDerrotados)*10) / (segundos * 0.1);
        
    }
    Math.floor(scorebasico);
    console.log(scorebasico);
}