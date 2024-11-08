document.addEventListener("DOMContentLoaded", function() {
    const zumbiEl = document.querySelector('#zombie');
    const vidaZumbiAtualEl = document.querySelector('#vida_zumbi_atual');
    const cliquesEl = document.querySelector('#cliques');
    const danoAtualEl = document.querySelector('#dano_atual');
    const zumbisMortosEl = document.querySelector('#zumbis_mortos');
    const timerEl = document.querySelector('#timer');
    const metaAtualEl = document.querySelector('#meta');
    const fecharMensagem = document.querySelector('#fechar-mensagem');
    const mensagemEl = document.querySelector('#mensagem-de-tela');
    const textoDaMensagem = document.querySelector('#texto-mensagem-tela');
    const tituloDaMensagem = document.querySelector('#Titulo-mensagem-tela');
    let taxaAumentoDeMeta;
    let quatidadedeaumentos = 0;

    const mensagensObj = [
        {mensagens: 'Os zumbis estão por toda a cidade, precisamos de um heroí que recupere as armas lendarias e os derrote!'},
        {mensagens: 'A vida é assim garoto, na próxima você consegue :D'},
        {mensagens: 'Você não tem cliques suficientes para comprar esta arma, clique em mais vezes para conseguir!'},
        {titulos: 'Bem Vindo Ao Game!'},
        {titulos: 'Você Morreu!'},
        {titulos: 'Falta-lhe Dinheiro!'}
    ];

    tituloDaMensagem.textContent = mensagensObj[3].titulos;
    textoDaMensagem.textContent = mensagensObj[0].mensagens;

    fecharMensagem.addEventListener('click', function() {
        mensagemEl.style.display = "none";
    });

    let vidaZumbi = 0;
    let dano = 1;
    let moedas = 0;
    let zumbiIndex = 0;
    let zumbisMortos = 0;
    let zumbiEspecialAtivo = false;
    let metaCliques =  5;
    metaAtualEl.textContent = `Meta de Cliques: ${metaCliques}`;

    // Array de zumbis normais e o zumbi especial
    const zumbis = [
        { nome: "Girassol", vida: 100, img: "images/zombie level 1.gif" },
        { nome: "Aí meu zoió", vida: 552, img: "images/zombie 2.gif" },
        { nome: "Maicombi", vida: 1458, img: "images/zombie 3.gif" },
        { nome: "ICone", vida: 2223, img: "images/zombie 4.gif" }
    ];


    const zumbiEspecial = { nome: "Algum Boss Do Terraria", vida: 10000, img: "images/Ocram.webp" };

    const danosEspadas = [1, 5, 10, 15, 20, 35, 45, 65, 95];
    const precosEspadas = [0, 100, 300, 500, 800, 1000, 2500, 5000, 8555];

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

            if(dano === 5){
                moedas += 3;
            }
            else if(dano === 10 || dano === 15){
                moedas += 5;
            }
            else if(dano === 20 || dano === 35){
                moedas += 8;
            }
            else if(dano === 45 || dano === 65){
                moedas += 10;
            }
            else if(dano === 95){
                moedas += 12;
            }
            else{
                moedas += 1;
            }
            vidaZumbi -= dano;
            

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
                metaCliques = 5;
                metaAtualEl.textContent = `Meta de Cliques: ${metaCliques}`;
            } else {

                tituloDaMensagem.textContent = mensagensObj[5].titulos;
                textoDaMensagem.textContent = mensagensObj[2].mensagens;
                mensagemEl.style.display = "flex";
            }
        });
    });
    
    let timeLeft = 60;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
    
        // Atualiza o display do timer
        timerEl.textContent = `Tempo: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
        // Muda a cor para vermelho quando o tempo é menor que 10 segundos
        if (timeLeft < 10) {
            timerEl.style.color = '#ff0000'; // vermelho
        } else {
            timerEl.style.color = '#ffffff'; // cor original
        }
        
        // Verifica se a meta de cliques foi atingida e reseta o tempo
        if (moedas >= metaCliques) {
            timeLeft = 60;  // Reseta o tempo
            taxaAumentoDeMeta = Math.floor(Math.random() * 43) + 1;
            metaCliques+= taxaAumentoDeMeta + (moedas/2 - 0.5);  // Incrementa a meta de cliques
            metaAtualEl.textContent = `Meta de Cliques: ${metaCliques}`;
            quatidadedeaumentos ++;
            if(quatidadedeaumentos %3 == 0){
                timeLeft += 10;
                quatidadedeaumentos = 0;
            }
        }
    
        // Reduz o tempo se ele ainda não tiver acabado
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            tituloDaMensagem.textContent = mensagensObj[4].titulos;
            textoDaMensagem.textContent = mensagensObj[1].mensagens;
            mensagemEl.style.display = "flex";

            fecharMensagem.addEventListener('click', function() {
                location.reload();
            });
        }
    }
    
    // Atualiza o timer a cada segundo
    setInterval(updateTimer, 1000);
    
    
});

document.addEventListener("DOMContentLoaded", function() {

});








