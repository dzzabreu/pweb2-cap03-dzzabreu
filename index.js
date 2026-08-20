// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):
//
import http from 'node:http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
// Rota 01
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end('Olá, Mundo!'); 
    return;
  }

  // Rota 02
  if (req.method === "GET" && req.url === "/sobre") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end('<h1>Sobre</h1>'); 
    return;
  }

  // Rota 03
  if (req.method === "GET" && req.url.startsWith('/saudacao/')) {
    const nome = decodeURIComponent(req.url.split("/")[2]);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Olá, ${nome}!`);
    return;
  }

  // Rota 04
  if (req.method === "POST" && req.url === "/echo") {
    let body = "";
    req.on("data", (chunk) => body = body + chunk);
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(body);
    });
    return;
  }

  // Rota 05
  if (req.method === "PUT" && req.url.startsWith("/itens/")) {
    const id = decodeURIComponent(req.url.split("/")[2]);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Item ${id} atualizado`);
    return;
  }

  // Rota 06
  if (req.method === "DELETE" && req.url.startsWith("/itens/")) {
    res.writeHead(204);
    res.end();
    return;
  }

});

server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
