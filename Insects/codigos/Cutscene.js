
let numMax = 18;
let index = 0;

let falas = [
    `<span class="orador">Sábio:</span> Ei, desperte! É tempo de levantar`,
    `<span class="orador">Sábio:</span> O que viu? o que sonhou? Compartilhe com todos nós!<br>É mágico? É azul? Você pode sentir?`,
    `<span class="orador">Sábio:</span> Sim! Sim! Com toda a certeza você presenciou! Você foi escolhido por ELE, para carregar seu povo de volta à Vida!`,
    `<span class="orador">Sábio:</span> Como? E por que? Eu não sei, não cabe aos velhos sábios a decisão de quem deve ser o Escolhido! Nem ao destino ... É a Brisa! `,
    `<span class="orador">Sábio:</span> Venha! E logo... Diante de toda o nossa raça, eu lhe entrego <span class="item">"A Manopola do Heroí"</span>!`,
    `<span class="orador">Sábio:</span> Com ela será capaz de recuperar a herança de nosso povo....`,
    `<span class="orador">Sábio:</span> A muito tempo atrás Nossa Raça era superior a todos os outros insetos, tinhamos algo que eles não tinham: O Poder da Brisa!`,
    `<span class="orador">Sábio:</span> Aranhas...Abelhas...e Mantis, se juntaram em uma aliança e roubaram a Nossa Brisa! O poder foi divido e nos presos aqui`,
    `<span class="orador">Sábio:</span> Fomos presos na Bota Encardida, para nunca mais emancipar! O heroí foi por anos aguardado...até se levantar...da Brisa`,
    `<span class="orador">Sábio:</span> Você, o heroi escolhido, tem como missão recuperar a Nossa Sagrada Brisa, derrotando Mantis...Abelhas e Aranhas...`,
    `<span class="orador">Sábio:</span> Por que você? Ah meu garoto...como disse existem coisas que não podem simplismente serem explicadas, Brisar é assim!`,
    `<span class="orador">Shendegas:</span> Mestre...tem certeza de que ele é heroí? Ele parece tão....`,
    `<span class="orador">Shendegas:</span> Ser O Heroí, é algo que requer muita cofiança por parte de nosso povo, aquele que obtiver o poder das três Brisas roubadas...`,
    `<span class="orador">Shendegas:</span> poderá adiquirir a Forma Brisada!`,
    `<span class="orador">Sábio:</span> Shendegas, jovem (xoven)... Ele se sairá bem, se esteve mesmo diante da presença de...Aff ele se sairá bem...`,
    `<span class="orador">Shendegas:</span> Eu discordo...Acho que eu deveria ser enviado para esta Missão!`,
    `<span class="orador">Sábio:</span> aqui está, deixo para você as instruções do sábio, já dei um role muito grande pelo mundo quando xoven, isso pode lhe ajudar`,
    `Você recebeu o <span class="item">Caderno do Velho Sábio</span> Este caderno velho e com uma letra muita feia, pode te ajudar com alguma coisa!`,
]
let imagens = [
    "assets/Cutscene/intro-cena1.svg",
    "assets/Cutscene/intro-cena2.svg",
    "assets/Cutscene/intro-cena3.svg",
    "assets/Cutscene/intro-cena2.svg",
    "assets/Cutscene/intro-cena4.svg",
    "assets/Cutscene/intro-cena5.svg",
    "assets/Cutscene/intro-cena6.svg",
    "assets/Cutscene/intro-cena7.svg",
    "assets/Cutscene/intro-cena8.svg",
    "assets/Cutscene/intro-cena2.svg",
    "assets/Cutscene/intro-cena3.svg",
    "assets/Cutscene/intro-cena2.svg",
    "assets/Cutscene/intro-cena3.svg",
    "assets/Cutscene/intro-cena2.svg",
    "assets/Cutscene/intro-cena3.svg",
    "assets/Cutscene/intro-cena2.svg",
    "assets/Cutscene/intro-cena3.svg",
    "assets/Cutscene/intro-cena2.svg",
]

const falasEl = document.querySelector("#fala");
const imageEl = document.querySelector("#tela");
falasEl.innerHTML = `${falas[index]}`;
imageEl.src = `${imagens[index]}`;

document.addEventListener("keydown", (event)=>{
    if(event.key === "a" || event.key === "A"){
        if(index < numMax - 1){
            index ++;
        }
        falasEl.innerHTML = `${falas[index]}`;
        imageEl.src = `${imagens[index]}`;
    }
    if(event.key === "s" || event.key === "S"){
        if(index > 0){
            index --;
        }
        falasEl.innerHTML = `${falas[index]}`; 
        imageEl.src = `${imagens[index]}`;
    }
})