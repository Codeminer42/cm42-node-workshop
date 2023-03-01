const { join } = require("path");
const { randomUUID } = require("crypto");
const { writeFile, readFile } = require("fs/promises");

const { cachePath } = require("../config");
const { createRedisInstance } = require("../lib/redis");

module.exports = function (app) {
  const { logger } = app.locals;

  const redis = createRedisInstance({ logger });

  app.locals.cacheImage = async function ({ url, image }) {
    const path = join(cachePath, randomUUID());

    await writeFile(path, image);

    const key = `image:${url}`;

    await redis.set(key, path);

    logger.debug(`Image stored in cache (Key: ${key} | Value: ${path})`);
  };

  app.locals.getCachedImage = async function ({ url }) {
    const path = await redis.get(`image:${url}`);

    if (!path) return null;

    const image = await readFile(path);

    return image;
  };
};
