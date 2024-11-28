const db = require('./db')
const token = require('../util/token')
const { ObjectId } = require('mongodb');

async function listarMensagens(salaId) {
    let sala = await db.findOne('salas', {_id: ObjectId.createFromHexString(salaId)});
    return {mensagens: sala.mensagens, usuarios: sala.membros};
}

async function enviarMensagem(data){
    if (!token.checkToken(data.headers.authorization)){
        return {error: "Token inválido"};
    }
    let decryptedToken = await token.decryptToken(data.headers.authorization);
    let userNick = decryptedToken.nick;
    let idSala = ObjectId.createFromHexString(data.body.salaId);
    let mensagem = data.body.mensagem;
    let sala = await db.findOne('salas', {_id: idSala});
    if (!sala) return { error: "Sala não encontrada" };
    if (!sala.mensagens) sala.mensagens = [];
    sala.mensagens.push({usuario: userNick, mensagem: mensagem, data : new Date()});
    await db.updateOne('salas', {_id: idSala}, {$set: {mensagens: sala.mensagens}});
    return {mensagens: sala.mensagens, usuarios: sala.membros};
}

module.exports = { listarMensagens, enviarMensagem };