// routes/salaRoutes.js
const express = require('express');
const router = express.Router();
const salaController = require('../controller/salaController');

// Get all salas
router.get('/salas', async (req, res) => {
    let resp = await salaController.get(req);
    res.status(200).send(resp);
});

// Get sala by ID
router.get('/salas/:id', async (req, res) => {
    let resp = await salaController.getById(req);
    res.status(200).send(resp);
});

// Create a new sala
router.post('/salas', async (req, res) => {
    let resp = await salaController.post(req, res);
    res.status(200).send(resp);
});

// Enter a sala
router.post('/salas/entrar', async (req, res) => {
    let resp = await salaController.entrar(req, res);
    res.status(200).send(resp);
});

// Exit a sala
router.post('/salas/sair', async (req, res) => {
    let resp = await salaController.sair(req, res);
    res.status(200).send(resp);
});

module.exports = router;
