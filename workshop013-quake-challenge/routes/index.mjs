import { Router } from "express";
import { parseLogFile } from "../parser/index.mjs";
import { jsonFormatter } from '../parser/game-results-json-formatter.mjs';

const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
  res.setHeader("X-Happy-New-Year", 2023);
  res.send(JSON.stringify({ hello: "world" }));
});

indexRouter.get("/results", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  
  const outputStream = jsonFormatter
  jsonFormatter
    .pipe(res)

  parseLogFile(outputStream, (error) => {
    if (error) {
      res.status(500).json({ error: "Oh no, something wrong happened" });
      return;
    }
    res.end();
  });
});

export default indexRouter;
