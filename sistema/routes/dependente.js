const express = require('express');
const router = express.Router();
let Dependente = require('../models').Dependente;
const azureStorage = require('../utils/uploadAzure');

router.get('/:fkUsuario',async (req,res,next)  => {
	try {
		let idUsuario = req.params.fkUsuario;
		const dadosDependentes = await Dependente.findAll({ where: {fkUsuario: idUsuario} });
		res.status(200).send(dadosDependentes);
	} catch (error) {
		res.status(500).send(error);
    }
});

router.get('/editarDependente/:idDependente',async (req,res,next)  => {
	try {
		let idDependente = req.params.idDependente;
		const dadosDependentes = await Dependente.findOne({ where: {idDependente: idDependente} });
		res.status(200).send(dadosDependentes);
	} catch (error) {
		res.status(500).send(error);
    }
});

router.post('/cadastrar', async (req,res,next) => {
    const {nome,dataNascimento,sexo,fkUsuario} = req.body;
    Dependente.create({
        nomeDependente: nome,
        dataNascimento: dataNascimento,
        sexo: sexo,
        fkUsuario: fkUsuario
    }).then(resultado => {
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
        alert("Erro de cadastro");
  	});
});

router.post('/upload/:idDependente', azureStorage.single('fotoDependente'), async(req,res,next) =>{
    if(!req.file){
        res.send({message: 'Erro ao enviar arquivo!'});
        res.end();
    } else{
        res.send({message: 'Arquivo enviado com sucesso!'});
        res.end();
    }
})

router.put('/update/:idDependente', async(req,res,next)=> {
    const {nome,dataNascimento,sexo,fkUsuario} = req.body;
    console.log(req.params.idDependente)
    Dependente.update({
        nomeDependente: nome,
        dataNascimento: dataNascimento,
        sexo: sexo,
        fkUsuario: fkUsuario
    },{
        where: {idDependente: req.params.idDependente}
    }).then(resultado => {
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
})
module.exports = router;