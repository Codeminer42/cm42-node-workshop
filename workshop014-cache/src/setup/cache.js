const { createClient } = require("redis");
const { randomUUID } = require("crypto");
const { cachePath, redis: redisConfig } = require("../config");
const { join } = require("path");
const { writeFile, readFile } = require("fs/promises");

module.exports = function (app) {
  const { logger } = app.locals;

  const redis = createClient({ url: redisConfig.url });

  redis
    .connect()
    .then(() => logger.info(`Successfully connected to Redis!`))
    .catch(() => logger.error(`Could not connect to Redis at ${redisConfig.url}.`));

  redis.on("error", (error) =>
    logger.error(`Something wrong happened with Redis: ${error}`)
  );

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
