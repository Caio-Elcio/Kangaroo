process.env.NODE_ENV = 'production';

//importando o express
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

//mapeamento de rotas
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var monitoramentosRouter = require('./routes/monitoramentos');
var dependenteRouter = require('./routes/dependente');
var computadorRouter = require('./routes/computador');

//instanciando o objeto express
var app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/monitoramentos', monitoramentosRouter);
app.use('/dependente', dependenteRouter);
app.use('/computador', computadorRouter);

module.exports = app;