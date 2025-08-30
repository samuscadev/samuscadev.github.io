let Tasks = [];

function adicionarTarefa(chave, nome, dataAtual, dataConclusao){
    let dadosJogador = carregarDados();
    const OBJETO = {
        tarefa: nome,
        inicio: `Início no dia: ${dataAtual}`,
        conclusao: `Conclusão no dia: ${dataConclusao}`,
    }
    const TAREFA = {
        chave: chave,
        data: dataConclusao
    }
    dadosJogador.listaAfazeres.push(TAREFA);
    alterarPropriedade("listaAfazeres", dadosJogador.listaAfazeres);
    
    Tasks.push(OBJETO);
    piscarBotao(5);
}

function getTarefas(){
    return Tasks;
}

function clearTarefas(){
    Tasks.splice(0, Tasks.length);
}