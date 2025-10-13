const nome = document.getElementById("input-nome").value.trim();
const recadinho = document.getElementById("input-recado").value.trim();

localStorage.setItem("nome", nome);
localStorage.setItem("recadinho", recadinho);