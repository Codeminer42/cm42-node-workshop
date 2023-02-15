const express = require("express");

const setupImageProcessor = require("./setup/imageProcessor");
const setupCache = require("./setup/cache");
const router = require("./routes");

const app = express();

app.use("/api", router);

const server = app.listen(process.env.PORT || 3000);

app.locals.server = server;

setupImageProcessor(app);
setupCache(app);

console.log("App ready and listening in port 3030.");
