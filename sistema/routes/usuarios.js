var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email = req.body.email_login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	

	let instrucaoSql = `select * from Usuario where email='${email}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.email);
			sessoes.push(resultado[0].dataValues.senha);
			sessoes.push(resultado[0].dataValues.nomeUsuario);
			console.log('sessoes: ', sessoes);
			res.send(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(401).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/cadastrar', function (req, res, next) {
	Usuario.create({
		nomeUsuario: req.body.nome,
		cpf: req.body.cpf,
		email: req.body.email,
		senha: req.body.senha
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
		alert("Erro de cadastro");
	});
});

/* Verificação de usuário */
router.get('/sessao/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);

	let tem_sessao = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});

/* Logoff de usuário */
router.get('/sair/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);
		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// update do usuário logado
router.put('/alterar', function (req, res, next) {
	var id = req.body.idUsuario;
	var username = req.body.editarUserName;
	var email = req.body.editarEmail;
	var senha = req.body.editarSenha;

	Usuario.update({
			nomeUsuario: username,
			email: email,
			senha: senha
		}, {
			where: {
				idUsuario: id
			},
			returning: true
		})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			console.log(resultado);
			res.status(200).send(resultado);

		}).catch(erro => {
			console.error("catch /alterar: " + erro);
			res.status(500).send(erro.message);
		});
});

// update da criança do usuário logado
router.put('/alterar/dependente', function (req, res, next) {
	console.log('alterando campos da tabela');

	var fk = req.body.fkUsuario;
	var nomeDependente = req.body.editarNomeDependente;
	var sexo = req.body.editarSexo;

	console.log("body: " + JSON.stringify(req.body));

	let instrucaoSql = `update dependente set nomeDependente='${nomeDependente}', sexo='${sexo}' 
	where fkUsuario=${fk} `;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		res.status(204).send();

	}).catch(erro => {
		console.error("catch /alterar/dependente: " + erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;