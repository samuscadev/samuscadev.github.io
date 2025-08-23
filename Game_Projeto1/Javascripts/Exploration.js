function buscarPlaneta(){
    let dadosPlanetaGerado = gerarPlaneta();
    let dadosJogador = carregarDados();
    dadosJogador.planetaAlvo = dadosPlanetaGerado;
    salvarDados(dadosJogador);

    let sHTML = `
        
            <div id="Planeta-Show">
                <img src="${dadosPlanetaGerado.sprite}" h="64px" height="64px">
                <h1>${dadosPlanetaGerado.nome}</h1>
            </div>
            
                <div class="custo">
                                <img src="Sprites/IU/population.png" h="42px" height="42px" class="iconStatus">
                                <p class="atributo">${formatarNumero(dadosPlanetaGerado.populacao)}</p>
                </div>
                <div class="custo">
                                <img src="Sprites/IU/coin.png" h="42px" height="42px" class="iconStatus">
                                <p class="green-atributo">+ ${dadosPlanetaGerado.bonus}/dia</p>
                </div>
    `;

    for (let chave of Object.keys(dadosPlanetaGerado.recursos)) { 
        let nome = getNome(chave)
        let sprite = getSprites(chave);
        let qnt = dadosPlanetaGerado.recursos[chave];
        sHTML += `          <div class="custo">
                                <img src="${sprite}" h="42px" height="42px" class="iconStatus">
                                <p class="atributo">${qnt}</p>
                            </div>`;
    }

    if(dadosPlanetaGerado.forca > 0){
        sHTML += `<button onclick="preBatalha()">Batalhar</button>`;
    }
    else{
        sHTML += `<button onclick="preColonia()">Colonizar</button>`;
    }

    mostrarMensagem(3, sHTML);
}