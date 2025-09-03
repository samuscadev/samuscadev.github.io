const SAVES = document.getElementById("saves");
if (localStorage.getItem("dados")) {
    let dadosJogador = carregarDados();
    SAVES.innerHTML = `
        <div id="quadrado">
            <img src="${dadosJogador.bandeira}" class="iconStatus">
            <h1>Seu Save: ${dadosJogador.nomeJogador}</h1>
        </div>
        <button onclick="window.location.href='game.html'" class="main-Button"> Jogar</button>
        <button onclick="deletarDados()" class="main-Button"> Deletar Save</button>
    `;
}
else{
    SAVES.innerHTML = `
        <button onclick="window.location.href='criarJogo.html'" class="main-Button"> Novo Jogo</button>
    `;
}