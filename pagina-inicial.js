document.getElementById("meuInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        event.preventDefault(); // Evita o envio do formulário, se houver
        const textoDigitado = event.target.value; // Armazena o valor do input em uma variável

        if (textoDigitado.toLowerCase().includes(" cu") || textoDigitado.toLowerCase().includes(" puta") || textoDigitado.toLowerCase().includes(" quero gozar")) {
            document.getElementById("resultado").textContent = "o texto digitado é ofensivo"; // Mensagem para João
        } else {
            document.getElementById("resultado").textContent = "Texto digitado: " + textoDigitado; // Mensagem padrão
        }
    }
});