import { Router } from "express";
import { parser } from "../parser/index.mjs";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.setHeader("X-Happy-New-Year", 2023);
  //   res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ hello: "world" }));
  //   res.json({ hello: "world" });
});

indexRouter.get("/results", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  parser(res, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Oh no, something wrong happened" });
      return;
    }
    res.end();
  });
});

export default indexRouter;
