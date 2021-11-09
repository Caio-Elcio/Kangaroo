let ctx = document.getElementById('myChart1').getContext('2d');

async function getsitesMaisNavegados() {
    let idSessionStorage = sessionStorage.getItem("usuario_logado_id");
    let dadosSites = await axios.get(`http://localhost:3000/monitoramentos/sitesmaisnavegados/${idSessionStorage}`);
    return dadosSites;
}
async function getTempoPc() {
    var tempoComputador1 = await axios.get('http://localhost:3000/monitoramentos/tempo/pc');
    return tempoComputador1.data[0].tempoDeUso.toFixed(0);
}
function timerAtualizarTempoPc() {
    setTimeout(function () {
        addData2();
    }, 5000);
}

async function atualizarTempoPc() {
    var tempoComputador = await getTempoPc();
    let tempoAtividadePc = `${tempoComputador} Horas`;
    tempoPc.innerHTML = tempoAtividadePc;
    chart2.data.push(tempoAtividadePc);
    timerAtualizarTempoPc();
    console.log(tempoAtividadePc)
}

console.log(getTempoPc())
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: [],
                backgroundColor: '#8BD1D9',
                fill: false,
                borderColor: '#8BD1D9',
                data: []
            },
            {
                label: [],
                backgroundColor: '#2E4D72',
                fill: false,
                borderColor: '#2E4D72',
                data: []
            }]
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Quantidade de acessos',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: true,
            labels: {
                fontColor: '#5a5a5a'
            }
        }
    }
});

var ctx2 = document.getElementById('myChart2').getContext('2d');
var chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Horas'],
        datasets: [
            {
                label: [],
                backgroundColor: '#8BD1D9',
                fill: false,
                borderColor: '#8BD1D9',
                data: []
            },
        ]
    },
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Horas',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    max: 10,
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: true,
            labels: {
                fontColor: '#5a5a5a'
            }
        }
    }
});

setTimeout(function () {
    addData();
}, 2000);

setTimeout(function () {
    addData2();
}, 2000);

async function addData() {
    let dadosY = await getsitesMaisNavegados();
    let dadosRota = dadosY.data;
    let nomesCriancas = separarNomes(dadosRota);

    for (const dadosNavegacao of dadosRota) {
        nomesCriancas.map((nomeCrianca, index) => {
            if (dadosNavegacao.nomeDependente == nomeCrianca) {
                chart.data.labels.push(tratarFrase(dadosNavegacao.titulo));
                chart.data.datasets[index].data.push(dadosNavegacao.quantidadeAcessos);
            } else {
                chart.data.datasets[index].data.push(0);
            }
        });
    }
    nomesCriancas.map((nome, index) => {
        chart.data.datasets[index].label.push(nome)
    })
    chart.update()
}

// async function atualizarTempoPc() {
//     var tempoComputador = await getTempoPc();
//     let tempoAtividadePc = `${tempoComputador} Horas`;
//     tempoPc.innerHTML = tempoAtividadePc;
//     timerAtualizarTempoPc();
// }

async function addData2() {
    chart2.data.datasets[0].label.pop()
    let dadosY = await getsitesMaisNavegados();
    let dadosRota = dadosY.data;
    let nomesCriancas = separarNomes(dadosRota);
    var tempoComputador = await getTempoPc();
    var tempoInt = parseInt(tempoComputador)
    console.log(typeof (tempoComputador))
    let tempoAtividadePc = `${tempoComputador} Horas`;
    tempoPc.innerHTML = tempoAtividadePc;
    timerAtualizarTempoPc();
    console.log(tempoAtividadePc)
    chart2.data.datasets[0].data.push(tempoInt - 1.5)
    chart2.data.datasets[0].label.push(dadosRota[0].nomeDependente)
    console.log(dadosRota)
    chart2.update()
}

function tratarFrase(frase) {
    if (frase.length > 10) {
        return frase.slice(0, 10) + "...";
    }
    return frase;
}

function separarNomes(arrayDeNavegacao) {
    let arrayNomesDependentes = arrayDeNavegacao.map(dadosDeNavegacao => dadosDeNavegacao.nomeDependente)
    let nomesDependentesSemRepetir = arrayNomesDependentes.filter((nomeDependentes, index) =>
        arrayNomesDependentes.indexOf(nomeDependentes) === index)
    return nomesDependentesSemRepetir;
}