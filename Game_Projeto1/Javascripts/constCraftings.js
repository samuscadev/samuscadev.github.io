const RECEITAS = {
    shipWar: {
      madeira: 1500,
      pedra: 500,
      tungstenio: 2800,
      ferro: 2800,
      vermelhita: 150,
      diamante: 50
    },

    shipTravel: {
      madeira: 11000,
      pedra: 1500,
      tungstenio: 2775,
      ferro: 3000,
      vermelhita: 150,
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
      vermelhita: 350,
      diamante: 100
    },

    shipBus: {
      madeira: 8000,
      pedra: 2500,
      tungstenio: 3000,
      ferro: 4000,
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