let salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
    let resp = await salaModel.listarSalas();
    return resp;
};
