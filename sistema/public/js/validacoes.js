let usuario_logado;
let login_usuario;
let senha_logado;

function changeToRegister() {
    login_register.style = 'display: none';
    register.style = 'display: flex;'
    register_step1.style = 'display: flex;';
}

function changeToLogin(e) {
    e.preventDefault();
    login_register.style = 'display: block, flex';
    register.style = 'display: none';
}

function validar_campo(campo) {
    let v = document.getElementById(campo).value;
    return v == null || v == ""
}

function prosseguir(e) {
    e.preventDefault();
    if (
        validar_campo('nomeResponsavel') ||
        validar_campo('cpf') ||
        validar_campo('email') ||
        validar_campo('senha2') ||
        validar_campo('senha3')) {
        alert('Adicione algum dado nos campos!')
        return false;
    }
    register_step1.style = 'display: none';
    register_step2.style = 'display: flex';
    form_login.style = 'display: none';
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    window.location.href = 'index.html';
}

function sair() {
    logoff();
}

function login(e) {
    e.preventDefault();
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(resposta => {
        console.log('resposta: ', resposta);
        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.login_usuario_meuapp = json.email;
                sessionStorage.usuario_logado_meuapp = json.nomeUsuario;
                sessionStorage.senha_logado_meuapp = json.senha;
                sessionStorage.usuario_logado_id = json.idUsuario;
                console.log(JSON.stringify(json));
                window.location.href = 'dashboard.html';
            });
        } else {
            alert("Erro de login!");
            console.log('Erro de login!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });
    return false;
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    usuario_logado = sessionStorage.usuario_logado_meuapp;
    senha_logado = sessionStorage.senha_logado_meuapp;

    if (login_usuario == undefined) {
        validar_sessao();
        alert("Você não está logado");
    } else {
        username.innerHTML = "Olá, " + usuario_logado;
        h1Nome.innerHTML = usuario_logado;
        username1.innerHTML = usuario_logado;
        email1.innerHTML = login_usuario;

        editarUserName1.value = usuario_logado;
        editarEmail1.value = login_usuario;
        editarSenha1.value = senha_logado;
        validar_sessao();
    }
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {
        cache: 'no-store'
    })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                logoff();
            }
        });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {
        cache: 'no-store'
    });
}

function validar_email() {
    var emaill = email_login.value;
    if (emaill.includes('@') == true && emaill.includes('.com') == true) {
        email_login.style = `border-color: green`;
    } else {
        email_login.style = `border-color:red`;
    }
}

function validar_senha() {
    var password = senha.value;
    if (password.length >= 8) {
        senha.style = `border-color: green`;
    } else {
        senha.style = `border-color:red`;
    }
}

function validarnomeResponsavel() {
    let nome = document.getElementById('nomeResponsavel');
    if ((nomeResponsavel.value).length < 3) {
        nome.style = `border-color: red`;
    } else {
        nome.style = `border-color: green`;
    }
}

function validarnomeDependente() {
    let nome = document.getElementById('nome');
    if ((nomeResponsavel.value).length < 3) {
        nome.style = `border-color: red`;
    } else {
        nome.style = `border-color: green`;
    }
}

function validar_cpf() {
    if ((cpf.value).length == 14) {
        cpf.style = `border-color: green`;
    } else {
        cpf.style = `border-color: red`;
    }
}

function validar_email2() {
    var emaill = email.value;
    if (emaill.includes('@') == true && emaill.includes('.com') == true) {
        email.style = `border-color: green`;
    } else {
        email.style = `border-color:red`;
    }
}

function validar_senha() {
    var password = senha.value;
    if (password.length >= 1) {
        senha.style = `border-color: green`;
    } else {
        senha.style = `border-color:red`;
    }
}

function validar_senha2() {
    var senh_a2 = senha2.value;
    if (senh_a2.length >= 1) {
        senha2.style = `border-color: green`;
    } else {
        senha2.style = `border-color: red`;
    }
}

function validar_senha3() {
    var senh_a3 = senha3.value;
    if (senh_a3 == senha2.value) {
        senha3.style = `border-color: green`;
    } else {
        senha3.style = `border-color: red`;
    }
}