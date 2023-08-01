import 'dotenv/config';

import { Env } from './_lib/env';

const env = Env.string('NODE_ENV', 'development');

const http = {
  port: Env.number('PORT', 3000),
};

const db = {
  development: {
    client: 'postgresql',
    connection: {
      database: Env.string('DATABASE_DB', 'ledgerdary_dev'),
      port: Env.number('DATABASE_PORT', 5432),
      user: Env.string('DATABASE_USER', 'postgres'),
      password: Env.string('DATABASE_PASSWORD', 'postgres'),
      host: Env.string('DATABASE_HOST', '127.0.0.1'),
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      database: Env.string('TEST_DATABASE_DB', 'ledgerdary_test'),
      port: Env.number('TEST_DATABASE_PORT', 5432),
      user: Env.string('TEST_DATABASE_USER', 'postgres'),
      password: Env.string('TEST_DATABASE_PASSWORD', 'postgres'),
      host: Env.string('TEST_DATABASE_HOST', '127.0.0.1'),
    },
  },
};

const config = { env, http, db };

type Config = typeof config;

export { config };
export type { Config };
