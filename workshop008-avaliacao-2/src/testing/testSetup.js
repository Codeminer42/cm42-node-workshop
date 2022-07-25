const { logger } = require('../_lib/logger');

beforeAll(() => {
  logger.level = logger.levels.values.fatal;
});
