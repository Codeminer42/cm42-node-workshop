import { Writable } from "node:stream";
import { parseLogFile } from "./parser/index.mjs";
import ejs from "ejs";

const createSocket =  (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    const outputStream = new Writable({
      objectMode: true,

      async write(result, _encoding, callback) {
        const html = await ejs.renderFile("./views/partials/result-list.ejs", { games: result.games });
        socket.emit("results.html", html);

        callback();
      }
    });

    parseLogFile(outputStream, (error) => {
      if (error) {
        socket.emit("error", error);
        return;
      }
    });
  });
}

export default createSocket;
