
function aumentarDesconto(){
    let dadosJogador = carregarDados();
    if(dadosJogador.perDesconto - 0.1 > 0.3){
        dadosJogador.perDesconto -= 0.1;
        alterarPropriedade("perDesconto", dadosJogador.perDesconto);
        alterarPropriedade("levelPesquisaDesconto", dadosJogador.levelPesquisaDesconto + 1);
    }
    else{
        console.log("Level Max");
    }
    alterarPropriedade("pesquisaEmAndamento", false);
    setTimeout(precPesquisas, 150);
}
function aumentarTrabalho(){
    let dadosJogador = carregarDados();
    if(dadosJogador.tempTrabalho - 1 > 5){
        dadosJogador.tempTrabalho -= 1;
        alterarPropriedade("tempTrabalho", dadosJogador.tempTrabalho);
        alterarPropriedade("levelPesquisaTrabalho", dadosJogador.levelPesquisaTrabalho + 1);
    }
    else{
        console.log("Level Max");
    }
    alterarPropriedade("pesquisaEmAndamento", false);   
    setTimeout(precPesquisas, 150); 
}
function aumentarForca(){
    let dadosJogador = carregarDados();
    if(dadosJogador.aumentoForca + 0.1 < 6.0){
        dadosJogador.aumentoForca += 0.1;
        alterarPropriedade("aumentoForca", dadosJogador.aumentoForca);
        alterarPropriedade("levelPesquisaForca", dadosJogador.levelPesquisaForca + 1);
    }
    else{
        console.log("Level Max");
    }
    alterarPropriedade("pesquisaEmAndamento", false);
    setTimeout(precPesquisas, 150);
}


function evoluir(id){
    if(id == "perDesconto"){
        aumentarDesconto();
    }
    else if(id == "tempTrabalho"){
        aumentarTrabalho();
    }
    else if(id == "aumentoForca"){
        aumentarForca();
    }
}

function pesquisar(id){
    let dadosJogador = carregarDados();
    let chave = "nada";
    if(id == 0){
        chave = "tempTrabalho";
    } else if(id == 1){
        chave = "perDesconto";
    } else if(id == 2){
        chave = "aumentoForca";
    }
    let dataAtual = dadosJogador.dias;
    let dataConclusao = dadosJogador.dias + dadosJogador.tempPesquisa;
    let nome = `Pesquisa para melhorar ${getNome(chave)}`;
    alterarPropriedade("pesquisaEmAndamento", true);
    setTimeout(precPesquisas, 150);
    adicionarTarefa(chave, nome, dataAtual, dataConclusao);
    
}
