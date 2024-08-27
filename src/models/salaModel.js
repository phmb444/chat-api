const db = require('./db')
const token = require('../util/token')
const { ObjectId } = require('mongodb');

async function listarSalas() {
  let salas = await db.findAll('salas');
  console.log(salas);
  return salas;
}

async function criarSala(data) {
  let salas = await db.insertOne('salas', {nome: data.nome, tipo: data.tipo, chave : data.chave, membros: [], mensagems: []});
  return salas;
}

async function entrarSala(data) { 
  let decryptedToken = await token.decryptToken(data.headers.authorization);
  let salaId = new ObjectId(data.body.salaId);
  let sala = await db.entrar('salas', {salaId, nick: decryptedToken.nick});
  return sala;
}

module.exports = {listarSalas, criarSala, entrarSala};