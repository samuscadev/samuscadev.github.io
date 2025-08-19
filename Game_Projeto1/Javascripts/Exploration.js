function buscarPlaneta(){
    let dadosPlanetaGerado = gerarPlaneta();
    let sHTML = `<h1>${dadosPlanetaGerado.nome}</h1>
    <img src="${dadosPlanetaGerado.sprite}" h="64px" height="64px">
    <h2> População: ${dadosPlanetaGerado.populacao}</h2>
    <h2> Força: ${dadosPlanetaGerado.forca}</h2>
    <h2> Bônus Diário: ${dadosPlanetaGerado.bonus}</h2>
    <div class="inventario">`;

    for (let chave of Object.keys(dadosPlanetaGerado.recursos)) { 
        let nome = getNome(chave)
        let sprite = getSprites(chave);
        let qnt = dadosPlanetaGerado.recursos[chave];
        sHTML += ` <div class="carta">
                            <h3>${nome}</h3>
                            <img src="${sprite}" h="64px" height="64px">
                            <h3>Quantidade : ${qnt}</h3>
                        </div>`;
    }
    sHTML += "</div>";
    mostrarMensagem(3, sHTML);
}