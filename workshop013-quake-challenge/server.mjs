import express from "express";
import indexRouter from "./routes/index.mjs";

const app = express();
const port = process.env.PORT || 8080;
app.use(indexRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
