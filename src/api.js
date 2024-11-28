const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*',  // Permite todas as origens (não recomendado em produção)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Permite enviar cookies ou credenciais
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
