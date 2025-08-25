function validar() {
            const nome = document.getElementById("nome").value.trim();
            const nomeImperio = document.getElementById("impNome").value.trim();
            if (nome === "") {
                alert("Por favor coloque um nome!");
                return;
            }
            if(nomeImperio == ""){
                alert("Por favor, nomeie seu império!");
                return;
            }
            else{
                criarDados(nome, nomeImperio);
                window.location.replace("game.html");
            }
}
