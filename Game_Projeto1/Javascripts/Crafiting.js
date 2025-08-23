function construirItem(item){
    const RECEITA = getReceitaItem(item);
    let sHtml = `<div class="inventario">`;
    let dadosJogador = carregarDados() || {};

    for (let chave of Object.keys(RECEITA)) { 
        let nome = getNome(chave)
        let sprite = getSprites(chave);
        let preco = RECEITA[chave];
        let estoque = dadosJogador.recursos[chave]
        sHtml += ` <div class="carta">
                            <h3>${nome}</h3>
                            <img src="${sprite}" h="64px" height="64px">
                            <h3>Custo: ${preco}</h3>
                            <h3>Estoque: ${estoque}</h3>
                        </div>`;
    }
    let tempo = dadosJogador.tempTrabalho

    sHtml += `</div>
              <h3> Tempo necessário: ${tempo} dias</h3>`;
    mostrarMensagem(1, sHtml, item)
}

function verificaConstrucao(item){
    const RECEITA = getReceitaItem(item);
    let dadosJogador = carregarDados() || {};
    let valido = true;
    if (!RECEITA) {
        console.error("Receita não encontrada para:", item);
    }
    for (let chave of Object.keys(RECEITA)) { 
        if(dadosJogador.recursos[chave] < RECEITA[chave]){
            valido = false;
            construcaoInvalida();
        }
    }
    if(valido){
        construir(item);
        construirItem(item)
    }
    
}

function construcaoInvalida(){
    mostrarMensagem(2)
}

function construir(item){
    const RECEITA = getReceitaItem(item);
    let dadosJogador = carregarDados() || {};

    for (let chave of Object.keys(RECEITA)) { 
        dadosJogador.recursos[chave] = dadosJogador.recursos[chave] - RECEITA[chave];            
    }
    salvarDados(dadosJogador)

    let chave = item;
    let descricao = `Construção de ${item}`;
    let dataConclusao = dadosJogador.dias + dadosJogador.tempTrabalho;
    
    adicionarTarefa(chave, descricao, dadosJogador.dias, dataConclusao);
}