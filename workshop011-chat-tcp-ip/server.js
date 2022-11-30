const { createServer } = require("net");
const connectedClients = [];

const server = createServer((socket) => {
  connectedClients.push(socket);
  const remoteAddress = socket.remoteAddress;
  console.log(remoteAddress + " connected");

  let username = "";
  socket.on("data", (json) => {
    const data = JSON.parse(json);

    switch (data.type) {
      case "handShake":
        username = data.name;

        connectedClients.forEach((client) => {
          try {
            client.write(`${username} connected`);
          } catch {}
        });
        break;
      case "message":
        connectedClients.forEach((client) => {
          try {
            client.write(`${username} sent: ${data.message}`);
          } catch {}
        });
        break;
    }
  });

  socket.on("close", () => {
    console.log(remoteAddress + " disconnected");
  });
});

server.listen(3030, () => console.log("Listening on 3030"));
