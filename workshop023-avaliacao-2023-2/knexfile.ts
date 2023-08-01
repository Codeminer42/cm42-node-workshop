import type { Knex } from 'knex';
import * as path from 'path';

import { config } from './src/config';

const commonConfig = {
  migrations: {
    directory: path.join(__dirname, 'src/infra/database/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src/infra/database/seeds'),
  },
};

type KnexConfig = {
  string?: Knex.Config;
};

const dbConfig = Object.entries(config.db).reduce<KnexConfig>(
  (knexConfig, [envName, envConfig]) => ({
    ...knexConfig,
    [envName]: {
      ...envConfig,
      ...commonConfig,
    },
  }),
  {}
);

export default dbConfig;
