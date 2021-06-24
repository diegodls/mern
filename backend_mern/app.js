const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const server = http.createServer((req, res) => {
  console.log("INICIANDO");
  console.log(req.method, req.url);

  res.end("Sucesso!");
});

server.listen(process.env.PORT);
