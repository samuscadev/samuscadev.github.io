
function criarBolha() {
    const bolha = document.createElement('div');
    bolha.classList.add('bolha');

    const tamanho = Math.random() * 20 + 10; // Tamanho entre 10px e 30px
    bolha.style.width = `${tamanho}px`;
    bolha.style.height = `${tamanho}px`;

    // Posição horizontal aleatória
    bolha.style.bottom = `10vh`;
    bolha.style.left = `${Math.random() * 100}vw`;

    document.body.appendChild(bolha);

    // Remover a bolha quando a animação acabar
    bolha.addEventListener('animationend', () => {
      bolha.remove();
    });
  }
  setInterval(criarBolha, 500);