const path = require('path');
const { db } = require('./src/config');

const commonConfig = {
  migrations: {
    directory: path.join(__dirname, 'src/infra/database/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src/infra/database/seeds'),
  },
};

const knexConfig = Object.entries(db).reduce(
  (knexConfig, [envName, envConfig]) => ({
    ...knexConfig,
    [envName]: {
      ...envConfig,
      ...commonConfig,
    },
  }),
  {}
);

module.exports = knexConfig;
