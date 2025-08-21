
const SENHA = "bC-56,h07x'l";
const SECAO_DEV = document.getElementById("sec-Dev-Tools");

function VmUXv9h4I6Rk(){
    const SENHA_DIGITADA = document.getElementById("dev-pass").value;
    window.alert("Seja bem vindo Samuel")
    if(SENHA_DIGITADA == SENHA){
        SECAO_DEV.innerHTML = `
        <button onclick="resetarDados()">Resetar</button>
        <button onclick="quebrarDados()">Quebrar o Jogo</button>"`;
    }
}
