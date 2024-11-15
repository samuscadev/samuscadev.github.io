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
    const balaoMagicoEL = document.querySelector('#Balao-magico');

    let taxaAumentoDeMeta;

    let quatidadedeaumentos = 0;
    const mensagensObj = [
        {mensagens: `Os zumbis estão por toda a cidade, precisamos de um heroí que recupere as armas lendarias e os derrote!`},
        {mensagens: 'A vida é assim garoto, na próxima você consegue :D'},
        {mensagens: 'Os cliques são usados pra comprar ou desbloquear itens e você não tem cliques suficientes para comprar esse item, clique em mais vezes para conseguir!'},
        {titulos: 'Bem Vindo Ao Game!'},
        {titulos: 'Você Morreu!'},
        {titulos: 'Falta-lhe Cliques!'}
    ];

    tituloDaMensagem.textContent = mensagensObj[3].titulos;
    textoDaMensagem.textContent = mensagensObj[0].mensagens;
            
        mensagemEl.style.display = "flex";
        localStorage.setItem("primeiraVisita", "true");


    fecharMensagem.addEventListener('click', function() {
        mensagemEl.style.display = "none";
    });

    let itemAtual;
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
        { nome: "Aí meu zoió", vida: 550, img: "images/zombie 2.gif" },
        { nome: "Maicombi", vida: 1530, img: "images/zombie 3.gif" },
        { nome: "ICone", vida: 2022, img: "images/zombie 4.gif" },
        { nome: "Pros Crias", vida: 3400, img: "images/ganon.gif" },
        { nome: "Monstro Aleatorio", vida: 4000, img: "images/geco.gif" },
        { nome: "Não é um Zumbi", vida: 5555, img: "images/flor-head.gif" }
        
    ];
    

    const nomesItens = [
        {nome: "Anel"},
        {nome: "Poção"},
        {nome: "Pintura"},
        {nome: "Máscara"},
        {nome: "Mapa"},
        {nome: "Baú"},
    ];

    const zumbiEspecial = { nome: "Algum Boss Do Terraria", vida: 1, img: "images/Ocram.webp" };

    const danosEspadas = [1, 5, 10, 15, 20, 35, 45, 65, 95];
    const precosEspadas = [0, 100, 300, 500, 800, 1000, 2500, 5000, 8555];
    const idUtensilios = [1, 2, 3, 4, 5, 6];
    const precosUtensilios = [10000, 15000, 22000, 18000, 35000, 100000];

    function mostrarObjeto() {
        balaoMagicoEL.style.display = 'flex';  // Mostra o objeto
        setTimeout(() => {
            balaoMagicoEL.style.display = 'none'; // Esconde após 2 segundos
        }, 1250);
    }

    setInterval(mostrarObjeto, 50000);

    function atualizarZumbi() {
        const zumbiAtual = zumbiEspecialAtivo ? zumbiEspecial : zumbis[zumbiIndex];
        zumbiEl.querySelector('img').src = zumbiAtual.img;
        zumbiEl.querySelector('#Nome_inimigo').textContent = zumbiAtual.nome;
        if(itemAtual == 4){
            vidaZumbi = zumbiAtual.vida/2;
        }
        if(itemAtual == 3){
            vidaZumbi = zumbiAtual.vida/3;
        }
        else{
            vidaZumbi = zumbiAtual.vida;
        }
        vidaZumbiAtualEl.textContent = `Vida: ${Math.trunc(Number(vidaZumbi))}`;
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
            if(itemAtual == 2){
                vidaZumbi -= dano * 2;
            }
            else{
                vidaZumbi -= dano;
            }

            vidaZumbiAtualEl.textContent = `Vida: ${vidaZumbi}`;
            cliquesEl.textContent = `Cliques: ${moedas}`;

            if (vidaZumbi <= 0) {
                zumbisMortos++;
                zumbisMortosEl.textContent = `Zumbis Mortos: ${zumbisMortos}`;

                if (zumbisMortos % 10 === 0) {

                    zumbiEspecialAtivo = true;
                }
                else if(zumbisMortos >= zumbis.length){
                    zumbiEspecialAtivo = false;
                    zumbiIndex = Math.floor(Math.random() * 5) + 1;;
                }
                else {
                    zumbiEspecialAtivo = false;
                    zumbiIndex = (zumbiIndex + 1) % zumbis.length;
                }

                atualizarZumbi();
            }
        }
    });

    balaoMagicoEL.addEventListener("click", function(){
        moedas += 100;
        cliquesEl.textContent = `Cliques: ${moedas}`;
    });


    const utencilios = document.querySelectorAll('.item-colecao');
    const nomeItemAtual = document.querySelector('#txto-item-atual');
    utencilios.forEach((utencilio, indexUtenciclios) => {
        utencilio.addEventListener('click', function() {
            const preco = precosUtensilios[indexUtenciclios];

            
            if (moedas >= preco) {
                itemAtual = idUtensilios[indexUtenciclios];
                precosUtensilios[indexUtenciclios] = 0;
                utencilio.querySelector('button').textContent = "Desbloqueado";
                utencilio.querySelector('img').style.filter = "brightness(100%)";
                utencilio.querySelector('img').style.opacity = "1";

                if(itemAtual == 6){
                    let temp = Math.floor(Math.random() * 4) + 1;
                    itemAtual = idUtensilios[temp];
                    nomeItemAtual.textContent = `Ativo: ${nomesItens[temp].nome}`;
                }
                else{
                    nomeItemAtual.textContent = `Ativo: ${nomesItens[indexUtenciclios].nome}`;
                }

            } else {
                tituloDaMensagem.textContent = mensagensObj[5].titulos;
                textoDaMensagem.textContent = mensagensObj[2].mensagens;
                mensagemEl.style.display = "flex";
                mensagemEl.style.backgroundImage = "linear-gradient(to right bottom, rgb(230, 148, 25), rgb(95, 64, 6))";
                mensagemEl.querySelector('img').src = "images/porco.webp";
            }
        });
    });


    const espadas = document.querySelectorAll('.espadinha');
    espadas.forEach((espada, index) => {
        espada.addEventListener('click', function() {
            const preco = precosEspadas[index];

            if (moedas >= preco) {
                dano = danosEspadas[index];
                danoAtualEl.textContent = `Dano Atual: ${dano}`;
                if(precosEspadas[index] != 0){
                    metaCliques = 5;
                }
                moedas -= preco;
                cliquesEl.textContent = `Cliques: ${moedas}`;
                precosEspadas[index] = 0;
                espada.querySelector('.preco_espadinha p').textContent = "Grátis";
                
                metaAtualEl.textContent = `Meta de Cliques: ${metaCliques}`;
            } else {

                tituloDaMensagem.textContent = mensagensObj[5].titulos;
                textoDaMensagem.textContent = mensagensObj[2].mensagens;
                mensagemEl.style.display = "flex";
                mensagemEl.style.backgroundImage = "linear-gradient(to right bottom, rgb(230, 148, 25), rgb(95, 64, 6))";
                mensagemEl.querySelector('img').src = "images/porco.webp";
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
            timerEl.style.color = 'rgb(255, 221, 31)'; // vermelho
        } else {
            timerEl.style.color = '#ffffff'; // cor original
        }
        
        // Verifica se a meta de cliques foi atingida e reseta o tempo
        if (moedas >= metaCliques) {
            timeLeft = 60;  // Reseta o tempo
            taxaAumentoDeMeta = (Math.random() * 0.4 + 1.1);
            metaCliques = taxaAumentoDeMeta * moedas;  // Incrementa a meta de cliques
            metaAtualEl.textContent = `Meta de Cliques: ${Math.trunc(metaCliques)}`;
    
            quatidadedeaumentos ++;
            if(itemAtual == 5 && quatidadedeaumentos %2 == 0){
                timeLeft += 25;
                quatidadedeaumentos = 0;
            }
            else if(quatidadedeaumentos %3 == 0){
                timeLeft += 10;
                quatidadedeaumentos = 0;
            }
        }
    
        // Reduz o tempo se ele ainda não tiver acabado
        if (timeLeft > 0) {
            timeLeft--;
            if(itemAtual == 1){
                moedas +=5;
                cliquesEl.textContent = `Cliques: ${moedas}`;
            }
            
        } else {
            tituloDaMensagem.textContent = mensagensObj[4].titulos;
            textoDaMensagem.textContent = mensagensObj[1].mensagens;
            mensagemEl.querySelector('img').src = "images/choro.gif";
            mensagemEl.style.display = "flex";
            mensagemEl.style.backgroundImage = "linear-gradient(to right bottom, rgb(209, 51, 51), rgb(80, 18, 18))";
            
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








