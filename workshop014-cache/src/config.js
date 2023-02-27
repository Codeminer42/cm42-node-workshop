const { join } = require("path");

const server = { port: process.env.PORT || 3000 };

const images = { storagePath: join(__dirname, "..", "storage", "images") };

const redis = { url: process.env.REDIS_URL };

module.exports = {
  server,
  images,
  redis,
  cachePath: join(__dirname, "..", "cache"),
};
