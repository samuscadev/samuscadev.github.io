const PRECOS_TABELADOS = {
    madeira: 100,
    pedra: 200,
    tungstenio: 300,
    ferro: 400,
    vermelhita: 500,
    diamante: 600
}

const NOMES_COISAS = {
    madeira: "Madeira Refinada",
    pedra: "Pedra Espacial",
    tungstenio: "Tungstênio",
    ferro: "Ferro Espacial",
    vermelhita: "Vermelhita",
    diamante: "Diamante",

    shipWar: "Nave De Guerra",
    shipTravel: "Nave Rápida",
    shipSpy: "Nave Espiã",
    shipDestroyer: "Destruidora de Mundos",
    shipBus: "Ônibus Espacial",
    shipAngular: "Nave Ângular"
}

const FORCA_EQUIPAMENTOS = {
    shipWar: 100,
    shipTravel: 0,
    shipSpy: 20,
    shipDestroyer: 250,
    shipBus: 0,
    shipAngular: 500
}

function getForca(valor){
    return FORCA_EQUIPAMENTOS[valor]
}

function getNome(valor){
    return NOMES_COISAS[valor] || (
        window.alert(`Erro ao Capturar Nome de ${valor}! error in constValues.js`),
        null
    );
}

function getPreco(valor){
    return PRECOS_TABELADOS[valor] || (
        window.alert(`Erro ao Capturar Preço de ${valor}! error in constValues.js`),
        null
    );
}
