const tempoPc = document.querySelector(".cardFourth .textoMaior");
const sitesMaliciosos = document.querySelector(".cardThree .textoMaior");

async function getTempoPc() {
    var tempoComputador1 = await axios.get('http://localhost:3000/monitoramentos/tempo/pc');
    return tempoComputador1.data[0].tempoDeUso.toFixed(0);
}

async function getSitesMaliciosos() {
    var sitesrestritos = await axios.get('http://localhost:3000/monitoramentos/sitesmaliciosos');
    return sitesrestritos.data[0].total;
}

function timerAtualizarTempoPc() {
    setTimeout(function () {
        atualizarTempoPc();
    }, 5000);
}

async function atualizarTempoPc() {
    var tempoComputador = await getTempoPc();
    let tempoAtividadePc = `${tempoComputador} Horas`;
    tempoPc.innerHTML = tempoAtividadePc;
    chart2.data.push(tempoAtividadePc);
    timerAtualizarTempoPc();
}

function timerAtualizarSitesMaliciosos() {
    setTimeout(function () {
        atualizarSitesMaliciosos();
    }, 5000);
}

async function atualizarSitesMaliciosos() {
    var sites = await getSitesMaliciosos();
    let sitesEncontrados = `${sites}`;
    sitesMaliciosos.innerHTML = sitesEncontrados;
    timerAtualizarSitesMaliciosos();
}

// GRAFICO RANDOMICO CPU
function plotarGraficoRandom() {
    setTimeout(function () {
        atualizarGraficoRandom();
    }, 3000);
}

async function atualizarGraficoRandom() {
    var dadoCpuCapturado = await getDadoCpu();
    var horaCaptura = new Date().toLocaleTimeString('pt-br');
    if (chart.data.datasets[0].data.length > 5) {
        removeData(chart.data);
    }
    chart.data.datasets[0].data.push(dadoCpuCapturado + 4);
    chart.data.labels.push(horaCaptura);
    chart.update();
    plotarGraficoRandom();
}

// GRAFICO RANDOMICO RAM
function plotarGraficoRandomRam() {
    setInterval(function () {
        chart2.data.datasets[0].data.push(dadoRamCapturado + 2);
        chart2.update();
        chart.data.datasets[0].data.push(dadoCpuCapturado + 5);
        chart.update();
    }, 3000);
}

// BOTÕES PARA VISUALIZAR OS PCS
function verPC() {
    setTimeout(function () {
        atualizarGrafico();
        atualizarGraficoRam();
    }, 3000);
}

function verPC2() {
    plotarGraficoRandomRam();
}

window.onload = atualizarTempoPc();
window.onload = atualizarSitesMaliciosos();
// window.onload = atualizarNomeDisco();
// window.onload = atualizarTempoDeTransferencia();