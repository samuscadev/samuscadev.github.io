function preBatalha(){
    let dadosJogador = carregarDados();
    let inimigo = dadosJogador.planetaAlvo;
    let forcaInimiga = formatarNumero(inimigo.forca);
    let forca = formatarNumero(dadosJogador.forca);
    let nomePlaneta = inimigo.nome;
    let custo = ultimaCasaComZeros(inimigo.forca);

    let sHtml = `<h2>Você deseja atacar "${nomePlaneta}"?</h2>
                    
                    <div class="custo">
                        <img src="Sprites/IU/forca.png" class="iconStatus">
                        <p class="atributo">${forca}</p>
                    </div>
                    <h2>VS</h2>
                    <div class="custo">
                        <img src="Sprites/IU/battle.png" class="redIconStatus">
                        <p class="red-atributo">${forcaInimiga}</p>
                    </div>

                    <div class="custo">
                        <img src="Sprites/IU/coin.png" class="redIconStatus">
                        <p class="red-atributo">- ${custo}</p>
                    </div>                    
    `;
    if(custo > dadosJogador.receita){
        sHtml += "<h3>Você não possui dinheiro para pagar a investida!</h3>"
    }
    else{
        sHtml += `<button onclick="calculoAutomaticoBatalha()">Batalhar</button>`;
    }
    mostrarMensagem(4, sHtml);
}

function calculoAutomaticoBatalha(){
    let dadosJogador = carregarDados();
    let inimigo = dadosJogador.planetaAlvo;
    let forcaInimiga = inimigo.forca;
    let forca = dadosJogador.forca;
    let custo = ultimaCasaComZeros(inimigo.forca);
    
    dadosJogador.receita -= custo;

    let porcentagemDanos = ((forca - forcaInimiga) / forcaInimiga) * 100;
    console.log(porcentagemDanos)

    let sHtml = "<h1>";
    if(porcentagemDanos >= 0){
        sHtml += `Você Venceu!</h1>`;
        let descricao = `Você lutou contra ${inimigo.nome} e venceu`;
        let dataAtual = dadosJogador.dias;
        let dataConclusao = dadosJogador.dias;
        adicionarTarefa(null, descricao, dataAtual, dataConclusao);

        sHtml += `
            <div id="Planeta-Show">
                <img src="${inimigo.sprite}" h="64px" height="64px">
                <h1><del>${inimigo.nome}</del>!</h1>
            </div>

            <h2>Ganhos:</h2>
            <div class="custo">
                <img src="Sprites/IU/coin.png" h="42px" height="42px" class="iconStatus">
                <p class="green-atributo">+ ${inimigo.bonus}/dia</p>
            </div>
        `;
        dadosJogador.salario +=  inimigo.bonus;

        for (let chave of Object.keys(inimigo.recursos)) {
            dadosJogador.recursos[chave] +=  inimigo.recursos[chave];
            let sprite = getSprites(chave);
            let qnt = inimigo.recursos[chave];
            sHtml += `          <div class="custo">
                                    <img src="${sprite}" h="42px" height="42px" class="iconStatus">
                                    <p class="atributo">${qnt}</p>
                                </div>`;
        }

        salvarDados(dadosJogador);
        sHtml += `<button onclick="anexar()">Anexar</button>`;
    }
    else {
        sHtml += `Você Perdeu!</h1>
                <h3>Perdas:</h3>`

        let perda = Math.ceil(Math.abs(porcentagemDanos) / 10);

        let descricao = `Você lutou contra ${inimigo.nome} e perdeu`;
        let dataAtual = dadosJogador.dias;
        let dataConclusao = dadosJogador.dias;
        adicionarTarefa(null, descricao, dataAtual, dataConclusao);

        // percorrer os equipamentos e reduzir
        let equipamentos = dadosJogador.qntEquipamentos;
        let naoPerdeuAlgo = true;
        for (let tipo in equipamentos) {
            if (perda <= 0){
                break;
            }

            if (equipamentos[tipo] > 0) {
                naoPerdeuAlgo = false;
                let remover = Math.min(equipamentos[tipo], perda);
                let sprite = getSpritesEquipamentos(tipo);
                sHtml += `<div class="custo">
                                <img src="${sprite}">
                                <p class="atributo">+ ${remover}</p>
                </div>`;
                console.log(tipo, " : ", remover);

                dadosJogador.qntEquipamentos[tipo] -= remover;
                perda -= remover;
                salvarDados(dadosJogador)
            }
        }
        if(naoPerdeuAlgo){
                let sprite = "Sprites/IU/battle.png";
                sHtml += `<div class="custo">
                                <img src="${sprite}" class="redIconStatus">
                                <p class="red-atributo">Você não possuia equipamentos para perder</p>
                </div>`;
        }
    }
    mostrarMensagem(5, sHtml);
    salvarDados(dadosJogador); 
}

function anexar(){
    let dadosJogador = carregarDados();

    let anexado = dadosJogador.planetaAlvo;
    dadosJogador.planetasConquistados.push(anexado);
    salvarDados(dadosJogador);
    precExploracao();
    let descricao = `Você anexou o planeta de ${anexado.nome}`;
    let dataAtual = dadosJogador.dias;
    let dataConclusao = dadosJogador.dias;
    adicionarTarefa(null, descricao, dataAtual, dataConclusao);
    salvarDados(dadosJogador);
    fecharMensagem(1);
}
