let labelSitesNavegados = document.getElementById("sitesNavegados");
let criancaConectada = document.getElementById("criancaConectada")
async function getsitesNavegados() {
    let idSessionStorage = sessionStorage.getItem("usuario_logado_id");
    let sitesNavegados = await axios.get(`http://localhost:3000/monitoramentos/sitesnavegados/${idSessionStorage}`);
    return sitesNavegados;
}
getsitesNavegados().then(input => {
    labelSitesNavegados.innerHTML = input.data[0].sitesNavegados
})

async function getID() {
    let idCrianca = await axios.get(`http://127.0.0.1:5000/retorno-id`)
    return idCrianca.data.id
}

async function getNomeCrianca() {
    let idCrianca = await getID()
    let nomeCrianca = await axios.get(`http://localhost:3000/monitoramentos/criancaconectada/${idCrianca}`)
    console.log(nomeCrianca.data[0])
    return nomeCrianca.data[0].nomeDependente
}

getNomeCrianca().then(inputCrianca => {
    criancaConectada.innerHTML = inputCrianca
})