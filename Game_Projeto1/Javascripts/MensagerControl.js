const TELA_DE_MENSAGEM = document.getElementById("mensagem");

function mostrarMensagem(id, sHtml = "<p></p>", chave = "none"){
    pararPassagemTempo();

    let stringHtml = `  <h1>Mensagem de Erro</h1>
                        <p>Não foi possivel mostrar a mensagem o id: em MensagerControl.js está errado!</p>
                        <button onclick="fecharMensagem()">Fechar</button>`;

    if(id == 0){
        stringHtml = `  <h1>Dinheiro Insuficiente!</h1>
                        <p>Você não possui dinheiro para comprar este item, você pode conseguir mais dinheiro aumentando sua receita diária ou vendendo itens</p>
                        <button onclick="fecharMensagem()">Fechar</button>`;
    }

    if(id == 1){
        stringHtml = `<h1>Itens necessarios para construção</h1>`;
        stringHtml += sHtml;
        stringHtml += `<button onclick="verificaConstrucao('${chave}')">Construir</button>`;
        stringHtml += `<button onclick="fecharMensagem()">Fechar</button>`;
    }

    if(id == 2){
        stringHtml = `  <h1>Recursos Insuficientes</h1>
                        <p>Você não possui os recursos totais para construir este equipamento, você pode conseguir recursos comprando na loja</p>
                        <button onclick="fecharMensagem()">Fechar</button>`;
    }

    if(id == 3){
        stringHtml = `<h1>Planeta Encontrado!</h1>`;
        stringHtml += sHtml;                
        stringHtml += `<button onclick="fecharMensagem()">Fechar</button>`;
    }

    TELA_DE_MENSAGEM.innerHTML = stringHtml;
    TELA_DE_MENSAGEM.style.display = "flex";
}

function fecharMensagem(){
    TELA_DE_MENSAGEM.style.display = "none";
    ativarPassagemTempo();
}