const express = require('express');
const router = express.Router();
const sequelize = require('../models').sequelize;
const Monitoramento = require('../models').Monitoramento;
const Navegacao = require('../models').navegacao;

router.get('/cpu', function (req, res, next) {
    sequelize.query('select top 1 usandoCpu from monitoramento where usandoCpu > 0 order by idMonitoramento desc;', {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.get('/ram', function (req, res, next) {
    sequelize.query('select top 1 usandoRam from monitoramento where usandoRam > 0 order by idMonitoramento desc;', {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.get('/disco', function (req, res, next) {
    sequelize.query('select top 1 usandoDisco from monitoramento where usandoDisco > 0 order by idMonitoramento desc;', {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.get('/tempo/pc', function (req, res, next) {
    sequelize.query('select top 1 tempoDeUso from monitoramento where tempoDeUso > 0 order by idMonitoramento desc;', {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.get('/sitesmaliciosos', function (req, res, next) {
    sequelize.query(`select count(distinct n.url) as total from usuario 
    inner join dependente as d on fkUsuario=idUsuario
    inner join navegacao as n on fkDependente=idDependente
    inner join sitesrestritos on fkNavegacao = idNavegacao
    ;`, {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});


router.get('/nomeDisco', function (req, res, next) {
    sequelize.query(`select top 1 nomeDisco from monitoramento where nomeDisco <> '' and nomeDisco <> 'a' order by idMonitoramento desc;`, {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.get('/capacidade', function (req, res, next) {
    sequelize.query(`select top 1 totalDisco from monitoramento where totalDisco > 0 order by idMonitoramento desc;`, {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.get('/tempoDeTransferencia', function (req, res, next) {
    sequelize.query(`select top 1 tempoDeAtividade from monitoramento where tempoDeAtividade > 0 order by idMonitoramento desc;`, {
        model: Monitoramento
    }).then((resultado) => {
        res.send(resultado);
    }).catch(() => {

    })
});

router.post('/navegacao', function (req, res, next) {
    console.log(req.body);
    Navegacao.create({
        titulo: req.body.title,
        url: req.body.url,
        contagemVisitas: req.body.visitCount,
        fkDependente: req.body.fkDependente
    }).then(result => {
        console.log(`Registro criado: ${result}`)
        res.send(result);
    }).catch(error => {
        console.error(error);
        res.status(500).send(error.message);
    });
});


router.get('/sitesmaisnavegados/:idUsuario', function(req, res, next) {
    const idUsuario = req.params.idUsuario;
    sequelize.query(`select top 5 
                        titulo,
                        nomeDependente, 
                        count(*) as quantidadeAcessos 
                        FROM navegacao 
                        inner join dependente 
                        on fkDependente = idDependente 
                        where fkUsuario = ${idUsuario} 
                        and titulo != ''
                        GROUP BY titulo,nomeDependente 
                        ORDER BY quantidadeAcessos desc`, 
    {
        model: Navegacao
    }).then((resultado)=>{
        res.send(resultado);
    }).catch(error=>{
        res.send(error);
    })
});

router.get('/sitesnavegados/:idUsuario', function(req, res, next) {
    const idUsuario = req.params.idUsuario;
    sequelize.query(`select count(DISTINCT url) as sitesNavegados from navegacao 
                    inner join dependente 
                    on fkDependente = idDependente 
                    where fkUsuario = ${idUsuario}`, 
    {
        model: Navegacao
    }).then((resultado)=>{
        res.send(resultado);
    }).catch(error=>{
        res.send(error);
    })
});

router.get('/criancaconectada/:idDependente', function(req, res, next) {
    const idDependente = req.params.idDependente;
    sequelize.query(`select nomeDependente from dependente where idDependente = ${idDependente}`, 
    {
        model: Navegacao
    }).then((resultado)=>{
        res.send(resultado);
    }).catch(error=>{
        res.send(error);
    })
});


module.exports = router;