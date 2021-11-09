var ctx = document.getElementById('myChart3').getContext('2d');

var ctx2 = document.getElementById('myChart4').getContext('2d');

var ctx3 = document.getElementById('myChart5').getContext('2d');

async function getDadoCpu() {
    var dadosCpu = await axios.get('http://localhost:3000/monitoramentos/cpu');
    return dadosCpu.data[0].usandoCpu.toFixed(1);
}

async function getDadoRam() {
    var dadosRam = await axios.get('http://localhost:3000/monitoramentos/ram');
    return dadosRam.data[0].usandoRam.toFixed(1);
}
async function getUsandoDisco() {
    var usandoDiscoP = await axios.get('http://localhost:3000/monitoramentos/disco');
    return usandoDiscoP.data[0].usandoDisco.toFixed(1);
}
// Fim async function
// Gráfico CPU
var conteudo = {
    // Tipo de gráfico
    type: 'line',
    // Aqui são as linhas e os principais dados dos nossos gráficos
    data: {
        labels: [],
        datasets: [
            {
                label: 'CPU',
                backgroundColor: '#6A9995',
                fill: false,
                borderColor: '#6A9995',
                data: []
            },
        ]
    },
    // Configurações opcionais
    options: {
        // Configurando escalas do eixo X e Y
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Hora da captura',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    max: 100,
                    beginAtZero: true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Megabytes usados(%)',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    max: 100,
                    beginAtZero: true
                }
            }]
        },
        // Legenda do lado
        legend: {
            display: true,
            labels: {
                fontColor: '#5a5a5a'
            }
        }
    }
}
var chart = new Chart(ctx, conteudo);

function plotarGrafico() {
    setTimeout(function () {
        atualizarGrafico();
    }, 2000);
}

var dadoCpuCapturado;
async function atualizarGrafico() {
    dadoCpuCapturado = await getDadoCpu();
    var horaCaptura = new Date().toLocaleTimeString('pt-br');
    if (chart.data.datasets[0].data.length > 5) {
        removeData(chart.data);
    }
    chart.data.datasets[0].data.push(dadoCpuCapturado);
    chart.data.labels.push(horaCaptura);
    chart.update();
    plotarGrafico();
}
window.onload = plotarGrafico();
// Gráfico RAM
var conteudo2 = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'RAM',
                backgroundColor: '#6A9995',
                fill: false,
                borderColor: '#6A9995',
                data: []
            },
        ]
    },
    // Configurações opcionais
    options: {
        // Configurando escalas do eixo X e Y
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Hora da captura',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    // max: 20,
                    beginAtZero: true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Gigabytes usados (GB)',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    // max: 20,
                    callback: function (value) {
                        return value + "GB"
                    }
                    // beginAtZero: true
                }
            }]
        },
        // Legenda do lado
        legend: {
            display: true,
            labels: {
                fontColor: '#5a5a5a'
            }
        }
    }
}
var chart2 = new Chart(ctx2, conteudo2);

function plotarGraficoRam() {
    setTimeout(function () {
        atualizarGraficoRam();
    }, 2000);
}

var dadoRamCapturado;
async function atualizarGraficoRam() {
    dadoRamCapturado = await getDadoRam();
    var horaCaptura = new Date().toLocaleTimeString('pt-br');
    if (chart2.data.datasets[0].data.length > 5) {
        removeData(chart2.data);
    }
    chart2.data.datasets[0].data.push(dadoRamCapturado);
    chart2.data.labels.push(horaCaptura);
    chart2.update();
    plotarGraficoRam();
}

function removeData(data) {
    data.datasets[0].data.shift();
    data.labels.shift();
}
window.onload = plotarGraficoRam();
// Fim Gráfico RAM
// Gráfico Disco
var conteudo3 = {
    // Tipo de gráfico
    type: 'line',
    // Aqui são as linhas e os principais dados dos nossos gráficos
    data: {
        labels: [],
        datasets: [
            {
                label: 'DISCO',
                backgroundColor: '#6A9995',
                fill: false,
                borderColor: '#6A9995',
                data: []
            },
        ]
    },
    // Configurações opcionais
    options: {
        // Configurando escalas do eixo X e Y
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'Hora de captura',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    max: 1000,
                    beginAtZero: true,
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    fontColor: "#5a5a5a",
                    labelString: 'MB',
                    fontSize: 13,
                    fontStyle: 'bold',
                },
                ticks: {
                    fontColor: '#5a5a5a',
                    beginAtZero: true,
                    max: 1000
                }
            }]
        },
        // Legenda do lado
        legend: {
            display: true,
            labels: {
                fontColor: '#5a5a5a'
            }
        }
    }
}

var chart3 = new Chart(ctx3, conteudo3);

function plotarGraficoDisco() {
    setInterval(function () {
        atualizarGraficoDisco();
    }, 2000);
}

async function atualizarGraficoDisco() {
    var dadoDiscoCapturado = await getUsandoDisco();
    var horaCaptura = new Date().toLocaleTimeString('pt-br');
    if (chart3.data.datasets[0].data.length > 5) {
        removeData(chart3.data);
    }
    chart3.data.datasets[0].data.push(dadoDiscoCapturado);
    chart3.data.labels.push(horaCaptura);
    chart3.update();
    plotarGraficoDisco;
}

function removeData(data) {
    data.datasets[0].data.shift();
    data.labels.shift();
}
window.onload = plotarGraficoDisco();