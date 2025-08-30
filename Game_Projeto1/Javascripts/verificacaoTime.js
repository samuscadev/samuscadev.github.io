function verificacaoDiaria() {
    let dadosJogador = carregarDados();
    if(dadosJogador.listaAfazeres.length > 0){
        for (let i = dadosJogador.listaAfazeres.length - 1; i >= 0; i--) {
            let tarefa = dadosJogador.listaAfazeres[i];

            if (tarefa.data == dadosJogador.dias) {
                let chave = tarefa.chave;

                if (dadosJogador.qntEquipamentos.hasOwnProperty(chave)) {
                    dadosJogador.qntEquipamentos[chave] += 1;
                    dadosJogador.listaAfazeres.splice(i, 1);
                    alterarPropriedade(`qntEquipamentos.${chave}`, dadosJogador.qntEquipamentos[chave]);

                } else if (dadosJogador.agentes.hasOwnProperty(chave)) {
                    dadosJogador.agentes[chave] += 1;
                    dadosJogador.listaAfazeres.splice(i, 1);
                    alterarPropriedade(`agentes.${chave}`, dadosJogador.agentes[chave]);

                } else if(dadosJogador.hasOwnProperty(chave)){
                    dadosJogador.listaAfazeres.splice(i, 1);
                    console.log(chave);
                    evoluir(chave);
                } 
                alterarPropriedade("listaAfazeres", dadosJogador.listaAfazeres);
                precContratos();
                precConstruir(dadosJogador);
            }
        }
    }
    else{
        console.log("verificacaoDiaria : Lista Vazia")
    } 
}

setInterval(() => {
    verificacaoDiaria()
}, 400);

