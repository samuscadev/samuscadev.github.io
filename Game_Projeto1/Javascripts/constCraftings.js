const RECEITAS = {
    shipWar: {
      madeira: 100,
      pedra: 100,
      tungstenio: 200,
      ferro: 200,
      vermelhita: 50,
      diamante: 0
    },

    shipTravel: {
      madeira: 1000,
      pedra: 500,
      tungstenio: 275,
      ferro: 300,
      vermelhita: 100,
      diamante: 50
    },

    shipSpy: {
      madeira: 1500,
      pedra: 0,
      tungstenio: 2440,
      ferro: 3000,
      vermelhita: 200,
      diamante: 20
    },

    shipDestroyer: {
      madeira: 11000,
      pedra: 5000,
      tungstenio: 3000,
      ferro: 3000,
      vermelhita: 200,
      diamante: 100
    },

    shipBus: {
      madeira: 800,
      pedra: 250,
      tungstenio: 300,
      ferro: 400,
      vermelhita: 200,
      diamante: 10
    },

    shipAngular: {
      madeira: 1570,
      pedra: 26,
      tungstenio: 1500,
      ferro: 1500,
      vermelhita: 500,
      diamante: 200
    }
}


function getReceitaItem(item){
    return RECEITAS[item] || null;
}