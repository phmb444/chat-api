const express = require('express');
const app = express();

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use the routes
const indexRouter = require('./router/index');
const salaRouter = require('./router/salaRouter');
const usuarioRouter = require('./router/usuarioRouter');
const mensagemRouter = require('./router/mensagemRouter');

app.use('/', indexRouter);
app.use('/', salaRouter);
app.use('/', usuarioRouter);
app.use('/', mensagemRouter);

module.exports = app;
