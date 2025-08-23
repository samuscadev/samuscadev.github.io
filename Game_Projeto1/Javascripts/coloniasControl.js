function preColonia(){
    let dadosJogador = carregarDados();
    let inimigo = dadosJogador.planetaAlvo;
    let nomePlaneta = inimigo.nome;
    let custo = ultimaCasaComZeros(inimigo.recursos.diamante * 10);

    let sHtml = `<h2>Você deseja Colonizar "${nomePlaneta}"?</h2>
                    <div class="custo">
                        <img src="Sprites/IU/coin.png" class="redIconStatus">
                        <p class="red-atributo">- ${custo}</p>
                    </div>
                    <div class="custo">
                        <img src="Sprites/itens/Ships/ship_Travel.png" class="redIconStatus">
                        <p class="red-atributo">- 1</p>
                    </div>
                    <div class="custo">
                        <img src="Sprites/itens/Ships/ship_bus.png" class="redIconStatus">
                        <p class="red-atributo">- 1</p>
                    </div>                        
    `;
    let temEquipamentos = false;
    if(dadosJogador.qntEquipamentos.shipTravel > 1 && dadosJogador.qntEquipamentos.shipBus > 1){
        temEquipamentos = true;
    }

    if(custo > dadosJogador.receita && !temEquipamentos){
        sHtml += "<h3>Você não possui recursos para pagar a viagem espacial!</h3>"
    }
    else{
        sHtml += `<button onclick="colonizar()">Colonizar</button>`;
    }
    mostrarMensagem(4, sHtml);
}

function colonizar(){
    let dadosJogador = carregarDados();
    
    
    let anexado = dadosJogador.planetaAlvo;
    let custo = ultimaCasaComZeros(anexado.recursos.diamante * 10);
    dadosJogador.receita -= custo;
    dadosJogador.qntEquipamentos.shipTravel -= 1;
    dadosJogador.qntEquipamentos.shipBus -= 1;

    salvarDados(dadosJogador);
    dadosJogador.planetasConquistados.push(anexado);
    console.log(anexado.recursos);
    Object.keys(anexado.recursos).forEach(recurso => {
        dadosJogador.recursos[recurso] += anexado.recursos[recurso];
    });
    salvarDados(dadosJogador);
    precExploracao();
    let descricao = `Você colonizou o planeta de ${anexado.nome}`;
    let dataAtual = dadosJogador.dias;
    let dataConclusao = dadosJogador.dias;
    adicionarTarefa(null, descricao, dataAtual, dataConclusao);
    salvarDados(dadosJogador);
    fecharMensagem(1);
}
