let Tasks = [];

function adicionarTarefa(chave, nome, dataAtual, dataConclusao){
    let dadosJogador = carregarDados();
    const OBJETO = {
        tarefa: nome,
        inicio: `Inicio no dia: ${dataAtual}`,
        conclusao: `Foi concluido no dia: ${dataConclusao}`,
    }
    const TAREFA = {
        chave: chave,
        data: dataConclusao
    }
    dadosJogador.listaAfazeres.push(TAREFA);
    salvarDados(dadosJogador);

    Tasks.push(OBJETO)
}

function getTarefas(){
    return Tasks;
}

function clearTarefas(){
    Tasks.splice(0, Tasks.length);
}