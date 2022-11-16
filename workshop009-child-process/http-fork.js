const http = require("http");
const fork = require("child_process").fork;

let port = +process.argv[2] || 8080;

process.on("message", (m) => {
  console.log(`${port} got message:`, m);
});

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
      port: port,
    })
  );
});

if (process.argv[3] !== "child") {
  for (let i = 1; i < 4; i++) {
    const child = fork(__filename, [port + i, "child"]);
    child.send({ msg: `Hello from port ${port}!` });
  }
}

server.listen(port, function () {
  console.log(`Running at ${port}`);
});