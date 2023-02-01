import { Writable } from "node:stream";
import { parseLogFile } from "./parser/index.mjs";
import ejs from "ejs";

const createSocket =  (io) => {
  io.on("connection", (socket) => {
    console.log("Connected!");

    const outputStream = new Writable({
      objectMode: true,
      write(result, _encoding, callback) {
        ejs.renderFile("./views/result-list.ejs", { games: result.games })
          .then((html) => {
            io.emit("results.html", html);

            callback();
          });
      }
    });

    parseLogFile(outputStream, (error) => {
      if (error) {
        io.emit("error", error);
        return;
      }
    });
  });
}

export default createSocket;
