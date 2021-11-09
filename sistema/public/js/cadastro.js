function validar_campo(campo) {
    let v = document.getElementById(campo).value;
    return v == null || v == ""
}

function cadastrarGeral(e) {
    e.preventDefault();
    if (
        validar_campo('nome') ||
        validar_campo('dataNascimento') ||
        validar_campo('sexo') ||
        validar_campo('fotoDependente')) {
        alert('Adicione algum dado nos campos!')
        return false;
    }
    let formularioResponsavel = new URLSearchParams(new FormData(register_step1));
    fetch("/usuarios/cadastrar", {
        method: "POST",
        body: formularioResponsavel
    })
        .then(T => T.json())
        .then(responseResponsavel => {
            let fkUsuario = document.getElementById('fkUsuario')
            fkUsuario.value = responseResponsavel.idUsuario;
            let formularioDependente = new URLSearchParams(new FormData(register_step2));
            fetch("/dependente/cadastrar", {
                method: "POST",
                body: formularioDependente
            }).then(T => T.json())
                .then(responseDependente => {
                    console.log(responseDependente);
                    const form = new FormData();
                    let arquivoFoto = document.querySelector('#fotoDependente').files[0];
                    let extensaoFoto = arquivoFoto.name.split('.');
                    console.log(arquivoFoto)
                    form.append("fotoDependente", arquivoFoto);
                    const settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": `/dependente/upload/${responseDependente.idDependente}.${extensaoFoto[extensaoFoto.length - 1]}`,
                        "method": "POST",
                        "headers": {},
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };
                    $.ajax(settings).done((response) => {
                        alert('Cadastro realizado com sucesso!');
                        register.style = 'display: none';
                        login_register.style = 'display: flex';
                        form_login.style = 'display: flex';
                    })
                })
                .catch(errDependente => {
                    console.error(errDependente);
                })
        })
        .catch(errResponsavel => {
            console.error(errResponsavel);
        });
}