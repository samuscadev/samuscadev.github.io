const EVOL_DESCONTO = [0.95, 0.75, 0.70, 0.6, 0.55, 0.5, 0.4, 0.3, 0.25]
const EVLO_TRABALHO = [14, 13, 12, 10, 8, 7, 6, 5, 4]
const EVLO_FORCA = [1.5, 1.6, 2, 2.5, 3, 3.5, 4, 5]

function aumentarDesconto(id){
    let dadosJogador = carregarDados();
    dadosJogador.perDesconto = EVOL_DESCONTO[id];
    salvarDados(dadosJogador);
}
function aumentarTrabalho(id){
    let dadosJogador = carregarDados();
    dadosJogador.tempTrabalho = EVLO_TRABALHO[id];
    salvarDados(dadosJogador);
}
function aumentarForca(id){
    let dadosJogador = carregarDados();
    dadosJogador.aumentoForca = EVLO_FORCA[id];
    salvarDados(dadosJogador);
}
