document.getElementById("meuInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        event.preventDefault(); // Evita o envio do formulário, se houver
        const textoDigitado = event.target.value; // Armazena o valor do input em uma variável

        if (textoDigitado.toLowerCase().includes(" cu") || textoDigitado.toLowerCase().includes(" puta") || textoDigitado.toLowerCase().includes(" gozar")
            || textoDigitado.toLowerCase().includes(" filho da") || textoDigitado.toLowerCase().includes(" vai se")
            || textoDigitado.toLowerCase().includes(" sigma") || textoDigitado.toLowerCase().includes(" ferrar")
            || textoDigitado.toLowerCase().includes(" tomar no") || textoDigitado.toLowerCase().includes(" muito especifico")
            || textoDigitado.toLowerCase().includes(" fuder") || textoDigitado.toLowerCase().includes(" fode") || textoDigitado.toLowerCase().includes(" foda")
        ) {
            document.getElementById("resultado").textContent = "seu safadinho, agora sei dos seu podres (ou não :D)"; // Mensagem para João
        } else {
            document.getElementById("resultado").textContent = "Texto digitado: " + textoDigitado; // Mensagem padrão
        }
    }
});