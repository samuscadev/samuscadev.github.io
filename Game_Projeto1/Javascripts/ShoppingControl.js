
function comprar(produto, valor){
  let dadosJogador = carregarDados() || {};
    if(dadosJogador.receita < valor){
      mostrarMensagem(0);
  }
  else{
      if (dadosJogador.recursos.hasOwnProperty(produto)) {
          dadosJogador.receita -= valor;
          dadosJogador.recursos[produto] += 100;
          alterarPropriedade(`recursos.${produto}`, dadosJogador.recursos[produto]);
          alterarPropriedade("receita", dadosJogador.receita);
      }
      piscarBotao(0);
      precContratos();
  }
}

function acrescentarAgente(dadosJogador, agente){
  if (dadosJogador.agentes.hasOwnProperty(agente)) {
    let chave = agente;
    let descricao = `Contrato  de um ${agente}`;
    let dataConclusao = dadosJogador.dias + dadosJogador.tempTrabalho;
    
    adicionarTarefa(chave, descricao, dadosJogador.dias, dataConclusao);
    mostrarMensagem(6);
  }
}

function contratarAgente(agente, valor){
  let dadosJogador = carregarDados() || {};
    if(dadosJogador.receita < valor){
        mostrarMensagem(0);
    }
    else{
        dadosJogador.receita -= valor;
        alterarPropriedade("receita", dadosJogador.receita);
        acrescentarAgente(dadosJogador, agente);
    }
}