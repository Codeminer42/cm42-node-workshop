import { Router } from "express";
import { resultsHandler } from "./results-handler.mjs";
import { resolve } from 'node:path'
import { sseHandler } from "./sse-handler.mjs";
import createSse from "../sse.mjs";

const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
  res.setHeader("X-Happy-New-Year", 2023);
  res.send(JSON.stringify({ hello: "world" }));
});

indexRouter.get("/results", resultsHandler);

indexRouter.get('/index', (req, res) => {
  res.sendFile(resolve('views', 'index.html'))
})

indexRouter.get('/sse', createSse)

export default indexRouter;
