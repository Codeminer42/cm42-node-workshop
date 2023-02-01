import ejs from "ejs";
import { Writable } from "stream";
import { parseLogFile } from "./parser/index.mjs";
import { resolve } from "path";

const createSocket =  (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    const outputStream = new Writable({
      objectMode: true,

      async write(result, _encoding, callback) {
        const templatePath = resolve("views", "partials", "result-list.ejs");
        const html = await ejs.renderFile(templatePath, { games: result.games });
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
