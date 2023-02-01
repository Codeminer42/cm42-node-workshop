import createSocket from "./socket.mjs";
import express from "express";
import indexRouter from "./routes/index.mjs";
import { PORT } from './lib/config.mjs';
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(indexRouter);

createSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
