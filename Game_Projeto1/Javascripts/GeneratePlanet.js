const NAMES = [
  "Syliw Vryan",
  "Soltheris",
  "Aroveth",
  "Alyndra",
  "Kanion",
  "Klythera",
  "Zerathis",
  "Zysphera",
  "Yandora",
  "Yapon",
  "Phoros",
  "Pyrrath",
  "Ifaarland",
  "Isengard",
  "Von Harthen",
  "Vulcan",
  "Elsia",
  "Chronos",
  "Orion",
  "Ordena"
];

const SPRITES_PLANETAS = [
    "Sprites/planets/planet_1.png",
    "Sprites/planets/planet_2.png",
    "Sprites/planets/planet_3.png"
]

function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortearTaxa(min, max) {
    return (Math.random() * (max - min)) + min;
}

function falue(){
    let n = sortearNumero(0, 1);
    if(n == 0){
        return true;
    }
    else{
        return false;
    }
}

function gerarPlaneta(){
    const TAM_NAME = NAMES.length - 1;
    let nomePlaneta = NAMES[sortearNumero(0, TAM_NAME)];

    const ID = sortearNumero(1, 999);
    const STR_ID = ID.toString();
    nomePlaneta += "-" + STR_ID;

    const TAM_IMAGENS = SPRITES_PLANETAS.length - 1;
    const SPRITE = SPRITES_PLANETAS[sortearNumero(0, TAM_IMAGENS)];

    const HABITAVEL = falue();
    const POPULACAO = HABITAVEL ? sortearNumero(10000, 999999999) : 0;
    const FORCA = Math.floor(POPULACAO * sortearTaxa(0.001, 0.009))
    const BONUS = HABITAVEL ? sortearNumero(10, 999) : 0;

    const RECURSOS = {
        madeira: sortearNumero(1, 10999),
        pedra: sortearNumero(1, 9999),
        tungstenio: sortearNumero(1, 10999),
        ferro: sortearNumero(1, 10999),
        vermelhita: sortearNumero(1, 10999),
        diamante: sortearNumero(1, 10999)
    }
    const DADOS = {
        nome: nomePlaneta,
        sprite: SPRITE,
        populacao: POPULACAO,
        forca : FORCA,
        recursos: RECURSOS,
        bonus: BONUS
    }
    console.log(DADOS);

    return DADOS;
}
