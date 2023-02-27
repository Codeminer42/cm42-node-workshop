const express = require("express");

const { server: serverConfig } = require("./config");
const setupImageProcessor = require("./setup/imageProcessor");
const setupLogger = require("./setup/logger");
const setupCache = require("./setup/cache");
const router = require("./routes");

const app = express();

app.use("/api", router);

const server = app.listen(serverConfig.port);

app.locals.server = server;

setupLogger(app);
setupImageProcessor(app);
setupCache(app);

app.locals.logger.info(`App ready and listening in port ${serverConfig.port}.`);
