document.addEventListener("DOMContentLoaded", function() {
    const zumbiEl = document.querySelector('#zombie'); // Seleciona o zumbi
    const vidaZumbiAtualEl = document.querySelector('#vida_zumbi_atual'); // Seleciona a vida do zumbi
    const cliquesEl = document.querySelector('#cliques'); // Seleciona o contador de cliques
    const danoAtualEl = document.querySelector('#dano_atual'); // Seleciona o dano atual
    const zumbisMortosEl = document.querySelector('#zumbis_mortos'); // Seleciona o contador de zumbis mortos

    let vidaZumbi = 0; // Inicializa a vida do zumbi
    let dano = 1; // Dano inicial (padrão)
    let moedas = 0; // Contador de moedas (cliques)
    let zumbiIndex = 0; // Índice do zumbi atual
    let zumbisMortos = 0; // Contador de zumbis mortos

    // Array de zumbis com nome, vida e imagem
    const zumbis = [
        { nome: "Girassol", vida: 100, img: "images/zombie level 1.gif" },
        { nome: "Aí meu zoió", vida: 550, img: "images/zombie 2.gif" },
        { nome: "Maicombi", vida: 1700, img: "images/zombie 3.gif" },
        { nome: "ICone", vida: 2200, img: "images/zombie 4.gif" }
    ];

    // Array com danos das espadas
    const danosEspadas = [1, 5, 10, 15, 35]; // Dano das espadas
    const precosEspadas = [0, 100, 500, 800, 1000]; // Preço das espadas

    // Função para atualizar o zumbi
    function atualizarZumbi() {
        const zumbiAtual = zumbis[zumbiIndex];
        zumbiEl.querySelector('img').src = zumbiAtual.img;
        zumbiEl.querySelector('#Nome_inimigo').textContent = zumbiAtual.nome;
        vidaZumbi = zumbiAtual.vida; // Reseta a vida do novo zumbi
        vidaZumbiAtualEl.textContent = `Vida: ${vidaZumbi}`;
    }

    // Inicializa o primeiro zumbi
    atualizarZumbi();

    // Atualiza cliques ao clicar no zumbi
    zumbiEl.addEventListener('click', function() {
        if (vidaZumbi > 0) {
            zumbiEl.querySelector('img').style.filter = "brightness(0%)";

            setTimeout(() => {
                zumbiEl.querySelector('img').style.filter = "brightness(100%)";
            }, 100);

            vidaZumbi -= dano;
            moedas += 1;

            vidaZumbiAtualEl.textContent = `Vida: ${vidaZumbi}`;
            cliquesEl.textContent = `Cliques: ${moedas}`;

            if (vidaZumbi <= 0) {
                zumbisMortos++; // Incrementa o contador de zumbis mortos
                zumbisMortosEl.textContent = `Zumbis Mortos: ${zumbisMortos}`; // Atualiza o contador de zumbis mortos

                zumbiIndex++;
                if (zumbiIndex < zumbis.length) {
                    atualizarZumbi();
                } else {
                    zumbiIndex = Math.floor(Math.random() * zumbis.length); // Define um zumbi aleatório
                    atualizarZumbi();
                }
            }
        }
    });

    // Seleciona espadas
    const espadas = document.querySelectorAll('.espadinha');
    espadas.forEach((espada, index) => {
        espada.addEventListener('click', function() {
            const preco = precosEspadas[index]; // Obtém o preço da espada

            if (moedas >= preco) { // Verifica se tem moedas suficientes (cliques)
                dano = danosEspadas[index]; // Define o dano da espada selecionada
                danoAtualEl.textContent = `Dano Atual: ${dano}`; // Atualiza o texto do dano atual
                moedas -= preco; // Deduz o preço da espada das moedas (cliques)
                cliquesEl.textContent = `Cliques: ${moedas}`; // Atualiza o contador de cliques
                precosEspadas[index] = 0; // Define o preço da espada como zero após a primeira compra
                espada.querySelector('.preco_espadinha p').textContent = "Grátis"; // Atualiza o preço exibido para o usuário
            } else {
                alert("Você não tem moedas suficientes para comprar esta espada!"); // Mensagem de erro
            }
        });
    });
});







