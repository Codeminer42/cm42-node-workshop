import { parseLogFile } from "../parser/index.mjs";
import { createJsonFormatter } from "../parser/game-results-json-formatter.mjs";

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
    res.render("results", { games: [] });
  } else
  {
    res.status(415).send("Unsupported format! =(");
  }
}
