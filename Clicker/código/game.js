document.addEventListener("DOMContentLoaded", function() {
    const zumbiEl = document.querySelector('#zombie');
    const vidaZumbiAtualEl = document.querySelector('#vida_zumbi_atual');
    const cliquesEl = document.querySelector('#cliques');
    const danoAtualEl = document.querySelector('#dano_atual');
    const zumbisMortosEl = document.querySelector('#zumbis_mortos');

    let vidaZumbi = 0;
    let dano = 1;
    let moedas = 0;
    let zumbiIndex = 0;
    let zumbisMortos = 0;
    let zumbiEspecialAtivo = false;

    // Array de zumbis normais e o zumbi especial
    const zumbis = [
        { nome: "Girassol", vida: 100, img: "images/zombie level 1.gif" },
        { nome: "Aí meu zoió", vida: 552, img: "images/zombie 2.gif" },
        { nome: "Maicombi", vida: 1458, img: "images/zombie 3.gif" },
        { nome: "ICone", vida: 2223, img: "images/zombie 4.gif" }
    ];

    const zumbiEspecial = { nome: "Algum Boss Do Terraria", vida: 10000, img: "images/Ocram.webp" };

    const danosEspadas = [1, 5, 10, 15, 35, 50];
    const precosEspadas = [0, 100, 500, 800, 1000, 10000];

    function atualizarZumbi() {
        const zumbiAtual = zumbiEspecialAtivo ? zumbiEspecial : zumbis[zumbiIndex];
        zumbiEl.querySelector('img').src = zumbiAtual.img;
        zumbiEl.querySelector('#Nome_inimigo').textContent = zumbiAtual.nome;
        vidaZumbi = zumbiAtual.vida;
        vidaZumbiAtualEl.textContent = `Vida: ${vidaZumbi}`;
    }

    atualizarZumbi();

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
                zumbisMortos++;
                zumbisMortosEl.textContent = `Zumbis Mortos: ${zumbisMortos}`;

                if (zumbisMortos % 10 === 0) {
                    // Ativa o zumbi especial a cada 10 zumbis mortos
                    zumbiEspecialAtivo = true;
                } else {
                    zumbiEspecialAtivo = false;
                    zumbiIndex = (zumbiIndex + 1) % zumbis.length;
                }

                atualizarZumbi();
            }
        }
    });

    const espadas = document.querySelectorAll('.espadinha');
    espadas.forEach((espada, index) => {
        espada.addEventListener('click', function() {
            const preco = precosEspadas[index];

            if (moedas >= preco) {
                dano = danosEspadas[index];
                danoAtualEl.textContent = `Dano Atual: ${dano}`;
                moedas -= preco;
                cliquesEl.textContent = `Cliques: ${moedas}`;
                precosEspadas[index] = 0;
                espada.querySelector('.preco_espadinha p').textContent = "Grátis";
            } else {
                alert("Você não tem moedas suficientes para comprar esta espada!");
            }
        });
    });
});







