const { join } = require("path");

const images = {
  mimeType: "image/png",
  storagePath: join(__dirname, "..", "storage", "images"),
};

module.exports = { images };
