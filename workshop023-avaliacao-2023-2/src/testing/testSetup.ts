import { logger } from '../_lib/logger';
import { beforeAll } from '@jest/globals';

beforeAll(() => {
  logger.level = 'fatal';
});
