const SEC_ADMIN = document.getElementById("sec10");

function precAdministracao(){
    let dadosJogador = carregarDados();

    htmlString = `
      <h1>Adiministração:</h1>
      <img id="bandeira-show" src="${dadosJogador.bandeira}">
      <h3>Bem vindo ${dadosJogador.nomeJogador} seu império galático: "${dadosJogador.nomeImperio}" está a suas ordens!</h3>
      <h2>Dados:</h2>
      <div id="Painel-Status">
        <div class="status">
            <img src="Sprites/IU/coin.png" class="greenIconStatus">
            <p id="valor" class="green-atributo">Receita Diária: ${dadosJogador.salario}</p>
        </div>
        <div class="status">
            <img src="Sprites/IU/forca.png" class="greenIconStatus">
            <p id="valor" class="green-atributo">Taxa de Força: ${Math.floor(dadosJogador.aumentoForca * 100)}%</p>
        </div>
        <div class="status">
            <img src="Sprites/IU/calendar.png" class="greenIconStatus">
            <p id="valor" class="green-atributo">Pesquisa: ${dadosJogador.tempPesquisa} dias</p>
        </div>
        <div class="status">
            <img src="Sprites/IU/calendar.png" class="greenIconStatus">
            <p id="valor" class="green-atributo">Trabalhos: ${dadosJogador.tempTrabalho} dias</p>
        </div>
      </div>
    `;

    SEC_ADMIN.innerHTML = htmlString;
}