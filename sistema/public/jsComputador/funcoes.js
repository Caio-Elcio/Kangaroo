//-----------------------------------------------------------------------------------------------------------
// Função: validarComputador(idSistema, idArmazenamento, idNome)
// Verifica se foram informados o sistema e o nome da criança
// Parâmetros:
// - idSistema: id do campo que contém o sistema do computador
// - idArmazenamento: id do campo que contém o armazenamento do computador
// - idNome: id do campo que contém o nome da criança
// OBS: Se faltar alguma informação (sistema ou nome da criança) aparecerá uma mensagem de erro. Em caso de 
// sucesso (todas as informações preenchidas), chama a função cadastrarComputador(...)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
var sistema;
var armazenamento;
var nome;

function cadastrarComputador() {
    if (typeof (Storage) !== "undefined") {
        sistema = document.getElementById("txtSO").value;
        armazenamento = document.getElementById("txtArmazenamento").value;
        nome = document.getElementById("txtNome").value;
        alert("Cadastro realizado com sucesso!");
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

function validarComputador() {
    sistema = document.getElementById("txtSO").value;
    armazenamento = document.getElementById("txtArmazenamento").value;
    nome = document.getElementById("txtNome").value;
    if (sistema == "")
        alert("Sistema Operacional não pode estar em branco. Favor preenchê-lo!");
    else if (nome == "")
        alert("Nome da criança não pode estar em branco. Favor preenchê-lo!");
    else {
        cadastrarComputador();
    }
}

function cardInformacoes() {
    let pc1 = document.getElementById("pc1");
    let responseSO = document.getElementById("responseSO");
    let responseMemory = document.getElementById("responseMemory");
    let responseChild = document.getElementById("responseChild");
    let modal = document.getElementById("modal");

    sistema = document.getElementById("txtSO").value;
    armazenamento = document.getElementById("txtArmazenamento").value;
    nome = document.getElementById("txtNome").value;

    pc1.style.display = 'flex';
    modal.style.display = 'none'
    responseSO.innerHTML = `<label id="responseSO">${sistema}</label>`;
    responseMemory.innerHTML = `${armazenamento}`;
    responseChild.innerHTML = `${nome}`;
}

function popUp(params) {
    let modal = document.getElementById("modal");
    let pc1 = document.getElementById("pc1");

    pc1.style.display = 'none';
    modal.style.display = 'flex'
}
//-----------------------------------------------------------------------------------------------------------
// Função: cadastrarComputador(sistema, armazenamento, nome)
// Cadastra um novo computador (so, armazenamento e nome da criança)
// Parâmetros:
// - sistema: so do computador a ser cadastrado (Ex: Windows)
// - armazenamento: armazenamento do computador a ser cadastrado (Ex: 500 GB)
// - nome: nome da criança a ser cadastrado (Ex: Grupo)
// OBS: Apos cadastrar o computador, atualiza a quantidade de computadores, ou seja, chama 
// a função atualizarTotalComputador()
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalComputadores(idCampo)
// Incrementa a quantidade de computador cadastrado (notebook localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de computador cadastrado
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque", ++document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalComputadores(idCampo)
// Incrementa a quantidade de computadores cadastrados (notebook localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de computadores cadastrados
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function carregarTotalEstoque(idCampo) {
    if (typeof (Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
//-----------------------------------------------------------------------------------------------------------
// Exibe todos os computadores (so, armazenamento e nome)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function listarEstoque() {
    if (typeof (Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Computadores Cadastrados:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum computador cadastrado 😢</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Sistema Operacional: " + produto.nome + "</li>");
                document.write("<li>Armazenamento: " + produto.codigo + "</li>");
                document.write("<li>Nome da Criança: " + produto.quantidade + "</li>");
                document.write("</ul>");
            });
        }
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
}