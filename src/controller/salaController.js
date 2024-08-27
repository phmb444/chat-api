let salaModel = require('../models/salaModel');
let token = require('../util/token');

exports.get = async (req, res) => {
     if (!token.checkToken(req.headers.authorization)){
        return {error: "Token inválido"};
    }
    let resp = await salaModel.listarSalas();
    return resp;
};

exports.post = async (req, res) => {
    if (!token.checkToken(req.headers.authorization)){
        return {error: "Token inválido"};
    }
    let resp = await salaModel.criarSala(req.body);
    return resp;
};

exports.entrar = async (req, res) => {
    if (!token.checkToken(req.headers.authorization)){
        return {error: "Token inválido"};
    }
    let resp = await salaModel.entrarSala(req);
    return resp;
}