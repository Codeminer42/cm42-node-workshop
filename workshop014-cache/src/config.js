const { join } = require("path");

const images = {
  mimeType: "image/jpeg",
  storagePath: join(__dirname, "..", "storage", "images"),
};

module.exports = { images };
