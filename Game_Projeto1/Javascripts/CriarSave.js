function validar() {
            const nome = document.getElementById("nome").value.trim();
            if (nome === "") {
                alert("Por favor, preencha o campo!");
                return;
            }
            else{
                criarDados(nome);
                window.location.replace("game.html");
            }
}
