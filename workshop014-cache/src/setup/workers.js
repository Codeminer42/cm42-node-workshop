const { Worker } = require("worker_threads");
const path = require("path");

const cacheUpdaterPath = path.join(
  __dirname,
  "..",
  "workers",
  "cacheUpdater.js"
);

module.exports = (app) => {
  const worker = new Worker(cacheUpdaterPath);

  worker.on("online", () =>
    app.locals.logger.info("CacheUpdater worker successfully started")
  );
};
