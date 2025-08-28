const SECAO_TASKS = document.getElementById("sec7");
const SECAO_CONTRATO = document.getElementById("sec8");

function precTasks(){
    let tarefas = getTarefas();
    let htmlString = `
        <h1>Tarefas Recentes:</h1>
        <p>Atualizar a página ou sair, deletam suas antigas tarefas</p>
        <div class="inventario">
    `;
    
    if(tarefas.length == 0){
        htmlString += ` <h3>Você não possui tarefas para Realizar ou já Realizadas!</h3>`;
    }
    else{

        tarefas.slice(-10).forEach(tarefa => {
            htmlString += `
                <div class="carta">
                    <h3>${tarefa.tarefa}</h3>
                    <p>${tarefa.inicio} e ${tarefa.conclusao}</p>
                </div>
            `;
        });

    }

    htmlString += "</div>";
    htmlString += `<button onclick="clearTarefas()">Limpar Tarefas</button>`;
    SECAO_TASKS.innerHTML = htmlString;
}

function precContratos(){
    let dadosJogador = carregarDados();
    let htmlString = `
        <h1>Agentes Disponiveis:</h1>
        <h3>Os agentes se juntam a você após ${dadosJogador.tempTrabalho} dias de assinar o contrato, eles precisam viajar até chegar em seu planeta ;). Para ver quando um agente contratado chega, cheque a lista de tarefas:</h3>
        <button onclick="mostrarSecao(6, SECOES)">Tarefas</button>
        <div class="inventario">
    `;

    for (let chave of Object.keys(dadosJogador.agentes || {})) {
        let nome = getNome(chave);
        let sprite = getSpritesAgentes(chave);
        let preco = getPrecoAgentes(chave) * dadosJogador.perDesconto;
        let forca = Math.floor(getForcaAgentes(chave) * dadosJogador.aumentoForca);
        htmlString += ` <div class="carta">
                            <h3>${nome}</h3>
                            <img src="${sprite}" h="64px" height="64px">
                            <div class="quebra-Custo">
                                <div class="custo">
                                    <img src="Sprites/IU/coin.png" class="redIconStatus">
                                    <p class="red-atributo"> - $${preco}</p>
                                </div>
                                <div class="custo">
                                    <img src="Sprites/IU/forca.png" class="iconStatus">
                                    <p class="green-atributo">+ ${forca}</p>
                                </div>
                            </div>
                            <button onclick="contratarAgente('${chave}', ${preco})">Contratar</button>
                        </div>`;
    }
    htmlString += `</div>
            <h1>Agentes Contratados:</h1>
            <div class="inventario">`;
    
    for (let chave of Object.keys(dadosJogador.agentes || {})) {
        let valor = dadosJogador.agentes[chave];
        if(valor > 0){
            let nome = getNome(chave);
            let sprite = getSpritesAgentes(chave);
            let forca = Math.floor(getForcaAgentes(chave) * dadosJogador.aumentoForca) * valor;
            htmlString += ` <div class="carta">
                            <h3>${nome}</h3>
                            <img src="${sprite}" h="64px" height="64px">
                            <div class="quebra-Custo">
                                <div class="custo">
                                    <img src="${sprite}" h="64px" height="64px" class="iconStatus">
                                    <p class="atributo">${valor}</p>
                                </div>
                                <div class="custo">
                                    <img src="Sprites/IU/forca.png" class="iconStatus">
                                    <p class="atributo">${forca}</p>
                                </div>
                            </div>
                        </div>`;
        }    
    }
    

    htmlString += "</div>";
    SECAO_CONTRATO.innerHTML = htmlString;
}
