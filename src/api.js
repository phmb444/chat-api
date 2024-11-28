const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para permitir CORS de qualquer origem
app.use(cors());  // Isso permite todas as origens

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use the routes
const indexRouter = require('./router/index');
const salaRouter = require('./router/salaRouter');
const usuarioRouter = require('./router/usuarioRouter');
const mensagemRouter = require('./router/mensagemRouter');

// Usar as rotas
app.use('/', indexRouter);
app.use('/', salaRouter);
app.use('/', usuarioRouter);
app.use('/', mensagemRouter);

module.exports = app;
