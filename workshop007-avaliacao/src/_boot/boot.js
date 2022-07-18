const config = require('../config');
const { prepareBoot } = require('../_lib/boot');
const { logger } = require('../_lib/logger');
const { connectDatabase } = require('../_lib/database');
const { initializeServer } = require('../_lib/http');
const { initializeRepositories } = require('../infra/database/initializeRepositories');
const { router } = require('../interface/http/Router');

const databaseArgs = { config, logger };
const serverArgs = { config, logger, router };

const boot = prepareBoot([
  () => connectDatabase(databaseArgs),
  initializeRepositories,
  () => initializeServer(serverArgs),
]);

module.exports = { boot };
