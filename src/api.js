const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para permitir CORS de qualquer origem
app.use(cors({
    origin: 'http://localhost:3000',  // Permite apenas requisições de localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Permite apenas os métodos específicos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Permite os cabeçalhos necessários
  }));

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
