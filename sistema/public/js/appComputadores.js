const tabela = document.querySelector(".div-table table");

let pc_count = 0;

while (pc_count <= computadores.length - 1) {
    console.log(pc_count);
    showPc(pc_count);
    pc_count++;
}

function cadastrarPc() {
    const nome = document.getElementById("nome");
    const so = document.getElementById("so").value;
    console.log(so);

    computadores.num.push(1);
    computadores.apelido.push(nome);
    computadores.so.push(so);
}