function acrescentarRecurso(dados, recurso, unidades) {
  if (dados.recursos.hasOwnProperty(recurso)) {
    dados.recursos[recurso] += unidades;
  }
}

function comprar(produto, valor){
  let dadosJogador = carregarDados() || {};
  if(dadosJogador.receita < valor){
      mostrarMensagem(0);
  }
  else{
      dadosJogador.receita -= valor;
      acrescentarRecurso(dadosJogador, produto, 100);
      piscarBotao(0);
      salvarDados(dadosJogador);
      precContratos();
  }
}

function acrescentarAgente(dadosJogador, agente){
  if (dadosJogador.agentes.hasOwnProperty(agente)) {
    console.log(agente)
    let chave = agente;
    let descricao = `Contrato  de um ${agente}`;
    let dataConclusao = dadosJogador.dias + dadosJogador.tempTrabalho;
    
    adicionarTarefa(chave, descricao, dadosJogador.dias, dataConclusao);
  }
  else{
    window.alert("Save Desatualizado")
  }
}

function contratarAgente(agente, valor){
  let dadosJogador = carregarDados() || {};
    if(dadosJogador.receita < valor){
        mostrarMensagem(0);
    }
    else{
        dadosJogador.receita -= valor;
        salvarDados(dadosJogador);
        acrescentarAgente(dadosJogador, agente);
    }
}