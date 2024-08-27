let usuarioModel = require('../models/usuarioModel');

exports.post = async (req, res) => {
    let resp = await usuarioModel.entrar(req.body);
    return resp;
}

exports.delete = async (req, res) => {
    let resp = await usuarioModel.sair(req.body);
    return resp;
}