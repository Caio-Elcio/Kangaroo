const baseUrl = 'http://localhost:3000'
async function getComputadores() {
    const idUsuario = sessionStorage.getItem("usuario_logado_id");
    const computadores = await axios.get(`${baseUrl}/computador/${idUsuario}`);
    return computadores.data;
}

async function adicionarDadosParaTabela() {
    const dadosComputadores = await getComputadores();
    for (const dado of dadosComputadores) {
        dadosTabela.innerHTML += `<tr> 
        <td id="idComputador">${dado.idComputador}</td> 
        <td>${dado.apelidoComputador}</td>
        <td>${dado.sistemaOperacional}</td>
        <td><button style="background: #4b4a4a;outline: none;border: none; margin:0;" onclick="deleteComputadores()" id=btnDelete>Deletar</button></td>
        </tr>`
    }
}

async function setComputadores() {
    const idUsuario = sessionStorage.getItem("usuario_logado_id");
    const criarComputador = axios({
        method: 'post',
        url: `${baseUrl}/computador`,
        data: {
            fkUsuario: idUsuario,
            sistemaOperacional: document.getElementById('so').value,
            apelidoComputador: document.getElementById('apelidoPc').value
        }
    });

    alert("Computador cadastrado com sucesso!")
    window.location = './computador.html';
    window.onclick = function (event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
        }
    }
    x.style = 'display:none';
    modalDiv.style = 'backdrop-filter: blur(0px); display:none';
    return criarComputador;
}

async function deleteComputadores() {
    const idComputador = document.getElementById('idComputador').innerText;
    console.log(idComputador)
    const deletePC = fetch(`http://localhost:3000/computador/${idComputador}`, {
        "method": "DELETE",
    })
    alert("Computador deletado com sucesso!")
    location.reload();
    return deletePC
}

window.onclick = function (event) {
    if (event.target == modalDiv) {
        modalDiv.style.display = "none";
    }
}
function fecharModal() {
    x.style = 'display:none';
    modalDiv.style = 'backdrop-filter: blur(0px); display:none';
}

adicionarDadosParaTabela();

window.onclick = function (event) {
    if (event.target == modalDiv) {
        modalDiv.style.display = "none";
    }
}

function fecharModal() {
    x.style = 'display: none';
    modalDiv.style = 'backdrop-filter: blur(0px); display: none;'
}