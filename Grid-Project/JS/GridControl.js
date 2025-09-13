function fixarAoConteiner(objeto){
    const CONTAINER = document.getElementById("conteiner");
    CONTAINER.appendChild(objeto);
}

function posicionarGrid(item, x, y){
    item.style.gridRow = `${x}/${x}`;
    item.style.gridColumn = `${y}/${y}`;
}

function criarGrid(x, y){
    let quadrado = document.createElement("div");
    quadrado.classList.add("tiles");
    
    let rd = randomInt(0, 100);
    if(rd <= 8){
        quadrado.classList.add("bau");
    }
    else{
        quadrado.classList.add("terra");
    }   

    posicionarGrid(quadrado, x, y);
    fixarAoConteiner(quadrado);
}

function desenharGrade(ordem){
    const CONTAINER = document.getElementById("conteiner");
    let string = ``;
    for(let j = 1; j <= ordem; j++){
        string += `1fr `;
    }
    
    CONTAINER.style.gridTemplateRows = string;
    CONTAINER.style.gridTemplateColumns = string;

    for(let i = 1; i <= ordem; i++){
        for(let j = 1; j <= ordem; j++){
            criarGrid(i, j);
        }
    }
}

desenharGrade(5);




