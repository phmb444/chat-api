require("dotenv").config();
const app = require("./src/api");

app.use((req, res, next) => {
  next();
});

let port = process.env.API_PORT;

app.listen(port);

console.log("Servidor rodando na porta " + port + "!");
