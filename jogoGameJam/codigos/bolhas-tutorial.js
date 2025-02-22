const container = document.getElementById('containerBolhas');

function criarBolha() {
  const bolha = document.createElement('div');
  bolha.classList.add('bubble');

  const tamanho = Math.random() * 30 + 20;
  bolha.style.width = `${tamanho}px`;
  bolha.style.height = `${tamanho}px`;
  bolha.style.left = `${Math.random() * 100}%`;

  container.appendChild(bolha);

  setTimeout(() => {
    bolha.remove();
  }, 5000);
}

setInterval(criarBolha, 500);
