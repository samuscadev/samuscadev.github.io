if (!localStorage.getItem("dados")) {
  const dados = {
    nomeJogador: 'player',
    dias: 0,
    salario: 10,
    receita: 1000,
    forca: 0,
    perDesconto: 1,
    tempTrabalho: 15,
    tempPesquisa: 20,
    
    recursos: {
      madeira: 0,
      pedra: 0,
      tungstenio: 0,
      ferro: 0,
      vermelhita: 0,
      diamante: 0
    },

    qntEquipamentos: {
      shipWar: 0,
      shipTravel: 0,
      shipSpy: 0,
      shipDestroyer: 0,
      shipBus: 0,
      shipAngular: 0
    }
  };
  localStorage.setItem("dados", JSON.stringify(dados));
}

function resetarDados() {
  const dadosOriginais = {
    nomeJogador: 'player',
    dias: 0,
    salario: 10,
    receita: 1000,
    forca: 0,
    perDesconto: 1,
    tempTrabalho: 15,
    tempPesquisa: 20,
    
    recursos: {
      madeira: 0,
      pedra: 0,
      tungstenio: 0,
      ferro: 0,
      vermelhita: 0,
      diamante: 0
    },

    qntEquipamentos: {
      shipWar: 0,
      shipTravel: 0,
      shipSpy: 0,
      shipDestroyer: 0,
      shipBus: 0,
      shipAngular: 0
    }
  };

  localStorage.setItem("dados", JSON.stringify(dadosOriginais));
}

function quebrarDados() {
  const dadosQuebrados = {
    nomeJogador: 'dev',
    dias: 0,
    salario: 1000,
    receita: 0,
    forca: 0,
    perDesconto: 0.1,
    tempTrabalho: 5,
    tempPesquisa: 5,
    
    recursos: {
      madeira: 100000,
      pedra: 100000,
      tungstenio: 100000,
      ferro: 100000,
      vermelhita: 100000,
      diamante: 100000
    },

    qntEquipamentos: {
      shipWar: 100,
      shipTravel: 100,
      shipSpy: 100,
      shipDestroyer: 100,
      shipBus: 100,
      shipAngular: 100
    }
  };

  localStorage.setItem("dados", JSON.stringify(dadosQuebrados));
}
