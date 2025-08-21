
const PAINEL_STATUS_El = document.getElementById("Painel-Status");
let pausado = false;

function atualizarStatus(elemento, dias) {
  let dados = carregarDados();

  if(dias == 1){ /*Se passou de dia*/ 
    dados.receita += dados.salario;
    dados.dias += 1;
  }
  let forcaTotal = 0;
  for (let chave of Object.keys(dados.qntEquipamentos)) {
      forcaTotal += getForca(chave) * dados.qntEquipamentos[chave];
  }
  dados.forca = forcaTotal;
  salvarDados(dados);

  elemento.innerHTML = `
    <h2>Status:</h2>
    <p id="nome">${dados.nomeJogador}</p>

    <div id="status">
        <img src="Sprites/IU/calendar.png" class="iconStatus">
        <p id="dias" class="atributo">${dados.dias}</p>
    </div>
    <div id="status">
        <img src="Sprites/IU/coin.png" class="iconStatus">
        <p id="valor" class="atributo">$ ${dados.receita}</p>
    </div>
    <div id="status">
        <img src="Sprites/IU/forca.png" class="iconStatus">
        <p id="forca" class="atributo">${dados.forca}</p>
    </div>    
  `;
}

function atualizarPainel(){
    setInterval(() => {
        atualizarStatus(PAINEL_STATUS_El, 0);
    }, 250);
}

function passagemTempo(){
    setInterval(() => {
        if(!pausado){
          atualizarStatus(PAINEL_STATUS_El, 1);
        }
    }, 5000);
}

function pararPassagemTempo(){
    pausado = true;
}
function ativarPassagemTempo(){
    pausado = false;
}

atualizarPainel()
passagemTempo()
