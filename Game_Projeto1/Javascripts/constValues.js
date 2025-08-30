const PRECOS_TABELADOS = {
    madeira: 100,
    pedra: 200,
    tungstenio: 300,
    ferro: 400,
    vermelhita: 500,
    diamante: 600
}

const PRECO_CONTRATO = {
    sith: 10000,
    sayajin: 20000,
    yoda: 40000,
    special: 3000,
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
    shipAngular: "Nave Ângular",

    sith: "Agente Sith",
    sayajin: "Guerreiro Sayajin",
    yoda: "Agente Jedi",
    special: "Za'kku Special Hunters",

    perDesconto: "Desconto em Produtos",
    tempTrabalho: "Tempo de Construção/Trabalho",
    aumentoForca: "Força das tropas",
}

const FORCA_AGENTES = {
    sith: 500,
    sayajin: 1000,
    yoda: 2000,
    special: 1500,
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

function getForcaAgentes(valor){
    return FORCA_AGENTES[valor]
}
function getPrecoAgentes(valor){
    return PRECO_CONTRATO[valor]
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
