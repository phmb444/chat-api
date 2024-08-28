// routes/index.js
const express = require('express');
const router = express.Router();

// Sobre route
router.get('/', (req, res) => {
    res.status(200).send({
        'nome': 'API-CHAT',
        'versão':'0.1.0',
        'autor': 'Pedro Haubert'
    });
});

module.exports = router;
