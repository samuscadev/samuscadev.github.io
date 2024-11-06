        const elementoMouse = document.getElementById("efeitosdeclique");
        const areaClique = document.getElementById("zombie");

        document.addEventListener("click", function(event) {
            // Verifica se o clique ocorreu dentro da section específica
            if (areaClique.contains(event.target)) {
                // Define a posição do elemento baseado nas coordenadas do clique
                elementoMouse.style.left = `${event.pageX -100}px`;
                elementoMouse.style.top = `${event.pageY -50}px`; // 10px abaixo do mouse
                elementoMouse.style.display = "block"; // Mostra o elemento

                // Oculta o elemento após 1 segundo
                setTimeout(() => {
                    elementoMouse.style.display = "none";
                }, 800);
            }
        });