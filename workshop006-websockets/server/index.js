const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "*" } });
const messages = [];

io.on("connection", (socket) => {
  const username = socket.handshake.auth.name;
  console.log(`user connected ${username}`);

  socket.on("message", ({ message }) => {
    messages.unshift({ message, name: username, type: "talk" });
    io.emit("message", messages);
  });

  socket.emit("message", messages);
  io.emit("userJoined", username);

  socket.on("disconnect", () => {
    console.log(`${username} has disconnected`);
  });
});

io.listen(8080);
