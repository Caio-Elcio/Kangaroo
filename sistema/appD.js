process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

//Registrar as rotas
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var usuariosRouter = require('./routes/usuarios');
var monitoramentosRouter = require('./routes/monitoramentos');
var dependenteRouter = require('./routes/dependente');
var computadorRouter = require('./routes/computador');

var app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Usar as rotas registradas
app.use('/', indexRouter);
app.use('/', dashboardRouter);
app.use('/usuarios', usuariosRouter);
app.use('/monitoramentos', monitoramentosRouter);
app.use('/dependente', dependenteRouter);
app.use('/computador', computadorRouter);


module.exports = app;