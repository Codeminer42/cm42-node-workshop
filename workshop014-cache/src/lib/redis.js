const { createClient } = require("redis");

const { redis: redisConfig } = require("../config");

const createRedisInstance = ({ logger = console }) => {
  const redis = createClient({ url: redisConfig.url });

  redis
    .connect()
    .then(() => logger.info(`Successfully connected to Redis!`))
    .catch(() =>
      logger.error(`Could not connect to Redis at ${redisConfig.url}.`)
    );

  redis.on("error", (error) =>
    logger.error(`Something wrong happened with Redis: ${error}`)
  );

  return redis;
};

module.exports = { createRedisInstance };
