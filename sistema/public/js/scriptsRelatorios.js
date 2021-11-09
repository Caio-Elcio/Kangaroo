var telas = document.getElementById("telas").getAttribute('data-tela')
var setaEsquerda = document.getElementById("setaEsquerda");
var setaDireita = document.getElementById("setaDireita");
var telaUm = document.getElementById("tela1");
var telaDois = document.getElementById("tela2");
var telaTres = document.getElementById("tela3");
var tituloTelas = document.getElementById("tituloTelas");
const divContainer = document.querySelector(".paiDebaixo");

async function getNomeDisco() {
    var nomeDisco = await axios.get('http://localhost:3000/monitoramentos/nomeDisco');
    return nomeDisco.data[0].nomeDisco;
}

var nd;
var tf;

async function atualizarNomeDisco() {
    var nomeDisco = await getNomeDisco();
    nd = `${nomeDisco}`;
    return nd;
}

async function getTempoDeTransferencia() {
    var tempoDeTransferencia = await axios.get('http://localhost:3000/monitoramentos/tempoDeTransferencia');
    return tempoDeTransferencia.data[0].tempoDeAtividade;
}

async function atualizarTempoDeTransferencia() {
    var taxaDeTransferencia = await getTempoDeTransferencia();
    tf = `${taxaDeTransferencia}`;
    return tf;
}

function voltarPagina() {
    limparTelas()
    switch (telas) {
        case '3':
            irTela2()
            break;
        case '2':
            irTela1()
            break;
        default:
            break;
    }
}

function avancarPagina() {
    limparTelas()
    switch (telas) {
        case '1':
            irTela2()
            break;
        case '2':
            irTela3()
            break;
        default:
            break;
    }
}

function limparTelas() {
    telaUm.style.display = 'none';
    telaDois.style.display = 'none';
    telaTres.style.display = 'none';
    setaEsquerda.style.display = 'none';
    setaDireita.style.display = 'none';
}

function irTela1() {
    telas = '1';
    tituloTelas.innerHTML = 'Dados de CPU'
    setaDireita.style.display = 'block';
    telaUm.style.display = 'flex';
}

function irTela2() {
    atualizarNomeDisco();
    atualizarTempoDeTransferencia();
    telas = '2';
    tituloTelas.innerHTML = 'Dados de Memória RAM';
    setaEsquerda.style.display = 'block';
    setaDireita.style.display = 'block';
    telaDois.style.display = 'flex';

    const boxTela31 = document.querySelector("#box-info1");
    divContainer.removeChild(boxTela31);

    const boxTela32 = document.querySelector("#box-info2");
    divContainer.removeChild(boxTela32);

    const boxTela33 = document.querySelector("#box-info3");
    divContainer.removeChild(boxTela33);
}

function irTela3() {
    telas = '3';
    tituloTelas.innerHTML = 'Dados de Disco'
    telaTres.style.display = 'flex';
    setaEsquerda.style.display = 'block';
    let box1 = document.createElement("div");
    let box2 = document.createElement("div");

    box1.id = "box-info1";
    box2.id = "box-info2";

    box1.innerHTML = `Nome disco: <br><b>${nd}</b>`;
    box2.innerHTML = `Taxa de transferência: <br><b>${tf}</b>`;

    box1.style.height = "10%";
    box1.style.width = "14%";
    box1.style.background = "#E5E5f";
    box1.style.paddingTop = "1%";
    box1.style.paddingLeft = "0.5%";
    box1.style.color = "#5a5a5a";
    box1.style.position = "absolute";
    box1.style.right = "8%";
    box1.style.bottom = "70%";
    box1.style.borderRadius = "3px";
    box1.style.borderLeft = "4px solid #6A9995";

    box2.style.height = "10%";
    box2.style.width = "14%";
    box2.style.background = "#E5E5E";
    box2.style.paddingTop = "1%";
    box2.style.paddingLeft = "0.5%";
    box2.style.color = "#5a5a5a";
    box2.style.position = "absolute";
    box2.style.bottom = "58%";
    box2.style.right = "8%";
    box2.style.borderRadius = "3px";
    box2.style.borderLeft = "4px solid #6A9995";

    divContainer.appendChild(box1);
    divContainer.appendChild(box2);
}