import { config } from '../config';
import { container } from '../container';
import { router } from '../interface/http/Router';
import { logger } from '../_lib/logger';

import { prepareBoot } from '../_lib/boot';
import { connectDatabase } from '../_lib/database';
import { initializeServer } from '../_lib/http';
import { initializeBackgroundJobs } from './backgroundJobs';

const databaseArgs = { config, logger };
const serverArgs = { config, logger, router, container };
const backgroundJobsArgs = { container, logger };

const boot = prepareBoot([
  () => connectDatabase(databaseArgs),
  () => initializeServer(serverArgs),
  () => initializeBackgroundJobs(backgroundJobsArgs),
]);

export { boot };
