const db = require('./db')
const token = require('../util/token')

async function entrar(data) {
  let usuario = await db.insertOne('usuarios', data);
  if (usuario.error) {
    return {message: 'Já existe um registro com esses dados'};
  }
  jwtoken = token.generateToken({nick: data.nick});
  let resp = {
    usuario: data.nick,
    token: jwtoken
  }
  return resp;
}

async function sair(data) {
  let usuario = await db.findOne('usuarios', data);
  if (usuario) {
    await db.deleteOne('usuarios', data);
    return {message: 'Usuário removido com sucesso.'};
  } else {
    return {message: 'Usuário não encontrado.'};
  }
}


module.exports = {entrar, sair};