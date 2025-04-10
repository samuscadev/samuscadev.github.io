let iconeFases = document.querySelectorAll(".icone-fase");
let balaoInformativo = document.querySelector("#balaozinho-menu-mapa");

for(let i =0; i < iconeFases.length; i++){
    iconeFases[i].addEventListener('mousemove', function(e){
        balaoInformativo.style.display = "block";
        let faseAtual = e.currentTarget;
        balaoInformativo.style.left = `${e.pageX}px`;
        balaoInformativo.style.top = `${e.pageY}px`;
        let nomeDaFase = faseAtual.dataset.nomedafase;
        balaoInformativo.innerHTML = `<p>${nomeDaFase}</p>`;
        
    })
    iconeFases[i].addEventListener('mouseout', function(){ 
        balaoInformativo.style.display = "none";  
    });
}