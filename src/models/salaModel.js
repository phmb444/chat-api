const db = require('./db')

async function listarSalas() {
  let salas = await db.findAll('salas');
  console.log(salas);
  return salas;
}

module.exports = {listarSalas};