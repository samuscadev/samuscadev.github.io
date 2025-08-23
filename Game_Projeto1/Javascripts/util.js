function carregarDados() {
  return JSON.parse(localStorage.getItem("dados"));
}

function salvarDados(dados) {
  localStorage.setItem("dados", JSON.stringify(dados));
}

function formatarNumero(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ultimaCasaComZeros(num) {
    const str = num.toString();
    const primeiro = str[0];                  
    const zeros = "0".repeat(str.length - 1);
    return parseInt(primeiro + zeros);
}

if(document.getElementById("logo")){
  const LOGO = document.getElementById("logo");
  LOGO.addEventListener("click", ()=>{
      window.location.href='index.html';
  })
}
