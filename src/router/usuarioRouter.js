// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

// User login
router.post('/entrar', async (req, res) => {
    let resp = await usuarioController.post(req, res);
    res.status(200).send(resp);
});

// User logout
router.post('/sair', async (req, res) => {
    let resp = await usuarioController.delete(req, res);
    res.status(200).send(resp);
});

module.exports = router;
