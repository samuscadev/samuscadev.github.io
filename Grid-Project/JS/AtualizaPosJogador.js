function atualizarPos(){
    const QUADRADOS = document.querySelectorAll(".tiles");
    const INIMIGOS = document.querySelectorAll(".inimigo");

    QUADRADOS.forEach(quadrado => {
        quadrado.addEventListener("click", () => {
            
            if(quadrado.classList.contains("bau")){
                mudarEstado(1);
            } else {
                mudarEstado(0);
            }

            QUADRADOS.forEach(q => q.style.border = "none");
            INIMIGOS.forEach(q => q.style.border = "none");

            jogador.mover(quadrado.style.gridRow, quadrado.style.gridColumn);
            
            quadrado.style.border = "3px white solid";
        });
    });
    
    INIMIGOS.forEach(inimigo => {
        inimigo.addEventListener("click", () => {

            mudarEstado(2);

            QUADRADOS.forEach(q => q.style.border = "none");
            INIMIGOS.forEach(q => q.style.border = "none");

            jogador.mover(inimigo.style.gridRow, inimigo.style.gridColumn);
            inimigo.style.border = "3px red solid";
        });
    });

}
atualizarPos();