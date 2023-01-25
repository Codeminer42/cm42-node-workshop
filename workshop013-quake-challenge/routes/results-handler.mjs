import { Writable } from "node:stream"
import { parseLogFile } from "../parser/index.mjs";
import { createJsonFormatter } from "../parser/game-results-json-formatter.mjs"

export const resultsHandler = (req, res) => {
  const { format = "json" } = req.query;

  if (format === "json") {
    res.setHeader("Content-Type", "application/json");

    const outputStream = createJsonFormatter()
    outputStream
      .pipe(res)

    parseLogFile(outputStream, (error) => {
      if (error) {
        res.status(500).json({ error: "Oh no, something wrong happened" });
        return;
      }
      res.end();
    });
  }
  else if (format === "html") {
    res.setHeader("Content-Type", "text/html");

    const outputStream = new Writable({
      objectMode: true,
      write(result, _encoding, callback) {
        res.render("results", { games: result.games });

        callback();
      }
    });

    parseLogFile(outputStream, (error) => {
      if (error) {
        res.status(500).send("Oh no, something wrong happened");
        return;
      }
      res.end();
    });
  } else
  {
    res.status(415).send("Unsupported format! =(");
  }
}
