import express from "express";
import indexRouter from "./routes/index.mjs";
import { Server } from "socket.io";
import { createServer } from "http";
import createSocket from "./socket.mjs";

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(indexRouter);

createSocket(io);

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
