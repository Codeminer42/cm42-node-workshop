const { createClient } = require("redis");
const { randomUUID } = require("crypto");
const { images } = require("../config");
const { join } = require("path");
const { writeFile, readFile } = require("fs/promises");

module.exports = function (app) {
  const redis = createClient({ url: "redis://cache:6379/0" });
  redis.connect().catch(console.error);

  redis.on("error", console.error);

  app.locals.cacheImage = async function ({ url, image }) {
    const path = join(images.storagePath, randomUUID());

    await writeFile(path, image);

    await redis.set(`image:${url}`, path);
  };

  app.locals.getCachedImage = async function ({ url }) {
    const path = await redis.get(`image:${url}`);

    if (!path) return null;

    const image = await readFile(path);

    return image;
  };
};
