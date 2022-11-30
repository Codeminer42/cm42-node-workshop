const { createServer } = require("net");

const server = createServer((socket) => {
  const remoteAddress = socket.remoteAddress;
  console.log(remoteAddress + " connected");

  socket.on("data", (data) => {
    console.log(data.toString());
  });

  socket.on("close", () => {
    console.log(remoteAddress + " disconnected");
  });
});

server.listen(3030, () => console.log("Listening on 3030"));
