function carregarDados() {
    garantirDados();
    return JSON.parse(localStorage.getItem("dados"));
}

function salvarDados(dados) {
    localStorage.setItem("dados", JSON.stringify(dados));
}

function formatarNumero(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const classePadrao = {
    salario: 50,
    receita: 100,
    forca: 0,
    perDesconto: 1,
    tempTrabalho: 20,
    tempPesquisa: 20, 
    aumentoCustosPesquisa: 100,
    custoPesquisa: 100,
    aumentoForca : 1.0,
}

function garantirDados(nome = "Player", nomeImp = "Império Galático", classe = classePadrao, spriteFlag = "Sprites/flags/5.png") {
    let dadosSalvos = localStorage.getItem("dados");
    let dados;

    if (!dadosSalvos) {
        criarDados(nome, nomeImp, spriteFlag, classe);
        return;
    }

    dados = JSON.parse(dadosSalvos);

    function preencherFaltantes(objPadrao, objAtual) {
        for (let chave in objPadrao) {
            if (!(chave in objAtual)) {
                objAtual[chave] = objPadrao[chave];
            } else if (typeof objPadrao[chave] === "object" && objPadrao[chave] !== null && !Array.isArray(objPadrao[chave])) {
                preencherFaltantes(objPadrao[chave], objAtual[chave]);
            }
        }
    }

    const dadosPadrao = {
        nomeJogador: nome,
        nomeImperio: nomeImp,
        bandeira: spriteFlag,
        dias: 0,
        salario: classe.salario,
        receita: classe.receita,
        gemas: 0,
        missoes: [],
        forca: classe.forca,
        aumentoCustosPesquisa: classe.aumentoCustosPesquisa,
        custoPesquisa: classe.custoPesquisa,
        perDesconto: classe.perDesconto,
        tempTrabalho: classe.tempTrabalho,
        tempPesquisa: classe.tempPesquisa,
        aumentoForca: classe.aumentoForca,
        levelPesquisaForca: 1,
        levelPesquisaTrabalho: 1,
        levelPesquisaDesconto: 1,
        pesquisaEmAndamento: false,

        recursos: {
            madeira: 0,
            pedra: 0,
            tungstenio: 0,
            ferro: 0,
            vermelhita: 0,
            diamante: 0
        },

        qntEquipamentos: {
            shipWar: 0,
            shipTravel: 0,
            shipSpy: 0,
            shipDestroyer: 0,
            shipBus: 0,
            shipAngular: 0
        },

        agentes: {
            sith: 0,
            sayajin: 0,
            yoda: 0,
            special: 0,
        },

        listaAfazeres: [],
        planetaAlvo: null,
        planetasConquistados: [],
        vitorias: [],
        conquistas: Array(25).fill(false),
        numConquistas: 0,
    };

    preencherFaltantes(dadosPadrao, dados);

    localStorage.setItem("dados", JSON.stringify(dados));
}

function ultimaCasaComZeros(num) {
    const str = num.toString();
    const primeiro = str[0];                  
    const zeros = "0".repeat(str.length - 1);
    return parseInt(primeiro + zeros);
}

if(document.getElementById("logo")){
  const LOGO = document.getElementById("logo");
  LOGO.addEventListener("click", ()=>{
      window.location.href='index.html';
  })
}

const BOTOES_SECAO = document.querySelectorAll(".botaoSecao")
BOTOES_SECAO.forEach(botao => {
    
    botao.dataset.corOriginal = getComputedStyle(botao).backgroundColor;

    botao.addEventListener("click", () => {
        
        BOTOES_SECAO.forEach(b => {
            b.style.backgroundImage = "linear-gradient(rgb(33, 110, 255) ,rgb(9, 95, 255),rgb(0, 61, 175))";
        });

        botao.style.backgroundImage = "linear-gradient(transparent, transparent)";
        botao.style.backgroundColor = "white";
    });
});

function piscarBotao(id){
    let botao = BOTOES_SECAO[id];
    botao.dataset.corOriginal = getComputedStyle(botao).backgroundColor;

    setTimeout(()=>{
        BOTOES_SECAO[id].style.backgroundColor = "red";
    }, 500)

    setTimeout(()=>{
        BOTOES_SECAO[id].style.backgroundColor = botao.dataset.corOriginal;
    }, 2000)
}

let devToolsOn = false;
const FERRAMENTAS = document.getElementById("ferramentas");
const FERRAMENTAS_Log = document.getElementById("sec-Dev-Tools");

function ativarDev(){
    if(devToolsOn){
        devToolsOn = false;
        FERRAMENTAS.style.display = "none";
        FERRAMENTAS_Log.style.display = "none";
    }
    else if(!devToolsOn){
        devToolsOn = true;
        FERRAMENTAS.style.display = "block";
        FERRAMENTAS_Log.style.display = "block";
    }
}