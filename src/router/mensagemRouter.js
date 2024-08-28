// routes/mensagemRoutes.js
const express = require('express');
const router = express.Router();
const mensagemController = require('../controller/mensagemController');

// Get message by ID
router.get('/mensagens/:id', async (req, res) => {
    let resp = await mensagemController.get(req);
    res.status(200).send(resp);
});

// Create a new message
router.post('/mensagens', async (req, res) => {
    let resp = await mensagemController.post(req, res);
    res.status(200).send(resp);
});

module.exports = router;
