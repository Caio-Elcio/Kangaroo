let usuario;
let dependente;

function mostrarSenhaI(e) {
    editarSenha1.type = "text";
    e.preventDefault();
    imgOlhoIC.style.display = "block";
    imgOlhoI.style.display = "none";
}

function esconderSenhaI(e) {
    editarSenha1.type = "password";
    e.preventDefault();
    imgOlhoIC.style.display = "none";
    imgOlhoI.style.display = "block";
}

function mostrarSenha(e) {
    e.preventDefault();
    senha1.innerHTML = sessionStorage.senha_logado_meuapp;
    imgOlhoC.style.display = "block";
    imgOlho.style.display = "none";
}

function esconderSenha(e) {
    e.preventDefault();
    senha1.innerHTML = "*********";
    imgOlhoC.style.display = "none";
    imgOlho.style.display = "block";
}

function editarResponsavel1() {
    username1.style.display = "none";
    email1.style.display = "none";
    senha1.style.display = "none";

    editarUserName1.style.display = "block";
    spanUserName1.style.display = "flex";

    editarEmail1.style.display = "block";
    spanEmail1.style.display = "flex";

    editarSenha1.style.display = "block";
    spanSenha1.style.display = "flex";

    btnSalvar1.style.display = "block";
    imgSalvar1.style.display = "block";

    imgOlhoI.style.display = "block";
    imgOlho.style.display = "none";
}

function salvar1() {
    var corporeq = {
        "editarUserName": editarUserName1.value,
        "editarEmail": editarEmail1.value,
        "editarSenha": editarSenha1.value,
        "idUsuario": sessionStorage.usuario_logado_id
    };

    var form_data = new FormData();
    Object.keys(corporeq).forEach(key => form_data.append(key, corporeq[key]));
    console.log("storage: " + sessionStorage.usuario_logado_meuapp)

    fetch("/usuarios/alterar", {
        method: "PUT",
        body: new URLSearchParams(form_data)
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                sessionStorage.login_usuario_meuapp = json[1][0].email;
                sessionStorage.usuario_logado_meuapp = json[1][0].nomeUsuario;
                sessionStorage.senha_logado_meuapp = json[1][0].senha;
            });
            alert("Alteração efetuada com sucesso");
            login_usuario = sessionStorage.login_usuario_meuapp;
            usuario_logado = sessionStorage.usuario_logado_meuapp;
            senha_logado = sessionStorage.senha_logado_meuapp;
            editarUserName1.value = "";
            editarEmail1.value = "";
            editarSenha1.value = "";
            location.reload()
        } else {
            alert("Erro de alteração");
            console.log('Erro de alteração!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });
}

function editarCrianca() {
    nomeCrianca.style.display = "none";
    SexoCrianca.style.display = "none";

    editarnomeCrianca.style.display = "block";
    spanNomeCrianca.style.display = "inline-block";

    editarSexoCrianca.style.display = "block";
    spanSexoCrianca.style.display = "inline-block";

    btnSalvarCrianca.style.display = "block";
    imgSalvarCrianca.style.display = "block";

    btnEditarCrianca.style.display = "none";
    imgEditarCrianca.style.display = "none";
}

function salvarCrianca(e) {
    e.preventDefault();
    let idUsuario = sessionStorage.getItem('usuario_logado_id');
    let fkUsuario = document.getElementById('fkUsuario');
    fkUsuario.value = idUsuario;
    let element = document.getElementById('modalCadastrarDependente');
    let formularioDependente = new URLSearchParams(new FormData(element));
    fetch("/dependente/cadastrar", {
        method: "POST",
        body: formularioDependente
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                const form = new FormData();
                let arquivoFoto = document.querySelector('#fotoDependente').files[0];
                let extensaoFoto = arquivoFoto.name.split('.');
                console.log(arquivoFoto)
                form.append("fotoDependente", arquivoFoto);
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `/dependente/upload/${json.idDependente}.${extensaoFoto[extensaoFoto.length - 1]}`,
                    "method": "POST",
                    "headers": {},
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };
                $.ajax(settings).done((response) => {
                    alert('Cadastro realizado com sucesso!')
                    location.reload();
                })
            });
            editarnomeCrianca.value = "";
            editarSexoCrianca.value = "";
        } else {
            alert("Erro de alteração");
            console.log('Erro de alteração!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });
}

function getCrianca() {
    const idUsuario = sessionStorage.getItem("usuario_logado_id");
    fetch(`/dependente/${idUsuario}`, {
        method: "GET"
    })
        .then(response => response.json()
            .then(listaDependentes => {
                let fichas = document.getElementById('containerQuadrados');
                for (const dependente of listaDependentes) {
                    fichas.innerHTML += `
              <div class="quadradoEmVolta">
                    <img class="photoDiv" src="https://storagekangaroo.blob.core.windows.net/kangaroo-container/${dependente.idDependente}.jpg" alt="">
                    <div class="containerTxt">
                        <label> <strong>${dependente.nomeDependente}</strong></label>
                        <label>${dependente.dataNascimento}</label>
                    </div>
                    <a onclick="changeEdit(event)">
                        <img id="fotoEdit" src="./assets/Edit.svg" style="cursor:pointer;" data-id="${dependente.idDependente}">
                    </a>
              </div>`
                }
            })
        )
}

function editCrianca(e) {
    e.preventDefault();
    const idDependente = document.getElementById('idDependente').value;
    let element = document.getElementById('modalCadastrarDependente');
    let formularioDependente = new URLSearchParams(new FormData(element));
    fetch(`/dependente/update/${idDependente}`, {
        method: "PUT",
        body: formularioDependente
    }).then(response => {
        if (response.ok) {
            let arquivoFoto = document.querySelector('#fotoDependente').files[0];
            if (arquivoFoto) {
                const form = new FormData();
                let extensaoFoto = arquivoFoto.name.split('.');
                console.log(arquivoFoto)
                form.append("fotoDependente", arquivoFoto);
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `/dependente/upload/${idDependente}.${extensaoFoto[extensaoFoto.length - 1]}`,
                    "method": "POST",
                    "headers": {},
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                };
                $.ajax(settings).done((response) => {
                    alert('Cadastro atualizado com sucesso!');
                    location.href = "#"
                    location.reload();
                })
            } else {
                alert('Cadastro atualizado com sucesso!');
                location.href = "#"
                location.reload();
            }
        } else {
            alert('Houve um erro, tente mais tarde.')
        }
    })
    window.onclick = function (event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = "none";
        }
    }
    x.style = 'display:none';
    modalDiv.style = 'backdrop-filter: blur(0px); display:none';
}

function changeEdit(e) {
    e.preventDefault();
    console.log(e.target);
    const idDependente = e.target.getAttribute('data-id');
    fetch(`/dependente/editarDependente/${idDependente}`, {
        method: "GET"
    })
        .then(response => response.json()
            .then(
                resposta => {
                    let idDependente = document.getElementById('idDependente');
                    let titulo = document.getElementById('tituloModal');
                    let inputNome = document.getElementById("nome");
                    let inputDataNascimento = document.getElementById("dataNascimento");
                    let selectSexo = document.getElementById("sexo");
                    let inputFkUsuario = document.getElementById("fkUsuario");
                    let botaoCadastrar = document.getElementById("btnCadastrar");
                    let botaoAtualizar = document.getElementById("btnEditar");
                    titulo.innerHTML = "Editar cadastro de filhos"
                    inputNome.value = resposta.nomeDependente;
                    idDependente.value = resposta.idDependente;
                    inputDataNascimento.value = resposta.dataNascimento;
                    selectSexo.value = resposta.sexo;
                    inputFkUsuario.value = resposta.fkUsuario;
                    botaoCadastrar.style = "display: none;"
                    botaoAtualizar.style = "display: block;"
                    location.href = '#modal';
                }
            ))

}

function standartModal(e) {
    e.preventDefault();
    let titulo = document.getElementById('tituloModal');
    let inputNome = document.getElementById("nome");
    let inputDataNascimento = document.getElementById("dataNascimento");
    let selectSexo = document.getElementById("sexo");
    let inputFkUsuario = document.getElementById("fkUsuario");
    let botaoCadastrar = document.getElementById("btnCadastrar");
    let botaoAtualizar = document.getElementById("btnEditar");

    titulo.innerHTML = "Cadastro de filhos";
    inputNome.value = "";
    inputDataNascimento.value = "";
    selectSexo.value = "invalid";
    inputFkUsuario.value = "";
    botaoCadastrar.style = "display: block";
    botaoAtualizar.style = "display: none;"
    location.href = '#modal';
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

getCrianca();