const express = require('express');
const router = express.Router();
const sequelize = require('../models').sequelize;
const computador = require('../models').Computador;

router.get('/:fkUsuario',async (req,res,next)  => {
	try {
		let idUsuario = req.params.fkUsuario;
		const dadosComputadores = await computador.findAll({ where: {fkUsuario: idUsuario} });
		res.status(200).send(dadosComputadores);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:idComputador', async (req,res,next)=>{
	try {
		const idComputador = req.params.idComputador;
		const dadosComputadores = await computador.findOne({ where: {idComputador: idComputador} })
		res.status(200).send(dadosComputadores);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post('/', async (req,res,next) => {
	try {
		const {fkUsuario,sistemaOperacional,apelidoComputador} = req.body;
		const response = await computador.create({
			fkUsuario: fkUsuario,
			sistemaOperacional: sistemaOperacional,
			apelidoComputador: apelidoComputador
		});
		res.status(201).send(response);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.put('/:idComputador', async (req,res,next) =>{
	try {
		const idComputador = req.params.idComputador;
		const {fkUsuario,sistemaOperacional,apelidoComputador} = req.body;

		const computadorEncontrado = await computador.findOne({ where: {idComputador: idComputador} })
		
		if(!computadorEncontrado){
			res.status(404).send()
			return
		}

		const response = await computador.update({
			fkUsuario: fkUsuario,
			sistemaOperacional: sistemaOperacional,
			apelidoComputador: apelidoComputador
		},
		{
			where: {idComputador: idComputador},
			returning: true
		})
		res.status(200).send(response);
	} 
	catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/:idComputador', async(req,res,next)=>{
	try {
		const idComputador = req.params.idComputador;
		await computador.destroy({
			where:{idComputador: idComputador}
		});
		res.status(204).send();
	} catch (error) {
		res.status(500).send(error);	
	}
});

module.exports = router;
