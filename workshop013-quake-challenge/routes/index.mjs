import { Router } from "express";
import { resultsHandler } from "./results-handler.mjs";

const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
  res.setHeader("X-Happy-New-Year", 2023);
  res.send(JSON.stringify({ hello: "world" }));
});

indexRouter.get("/results", resultsHandler);

export default indexRouter;
