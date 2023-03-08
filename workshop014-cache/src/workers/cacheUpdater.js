const { watch, existsSync } = require("fs");
const path = require("path");

const { createRedisInstance } = require("../lib/redis");
const config = require("../config");

const redis = createRedisInstance({ logger: console });

watch(config.images.storagePath, async (event, filename) => {
  const filePath = path.join(config.images.storagePath, filename);

  const fileWasDeleted = !existsSync(filePath);

  if (fileWasDeleted) {
    const keys = redis.scanIterator({
      MATCH: `image:/${encodeURIComponent(filename)}*`,
    });

    for await (let key of keys) {
      console.log(`Removing ${key} from cache`);

      redis.unlink(key);
    }
  }
});
