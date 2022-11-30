const { createServer } = require("net");
const connectedClients = [];

const server = createServer((socket) => {
  connectedClients.push(socket);
  const remoteAddress = socket.remoteAddress;
  console.log(remoteAddress + " connected");

  socket.on("data", (data) => {
    connectedClients.forEach((client) => {
      try {
        client.write(data);
      } catch {}
    });
    console.log(data.toString());
  });

  socket.on("close", () => {
    console.log(remoteAddress + " disconnected");
  });
});

server.listen(3030, () => console.log("Listening on 3030"));
