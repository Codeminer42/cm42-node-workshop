require('dotenv').config();
const path = require('path');
const { Env } = require('./_lib/env');

const env = Env.string('NODE_ENV', 'development');

const http = {
  port: Env.number('PORT', 3000),
};

const swagger = {
  title: 'Find-a-Dish API',
  version: '1.0.0',
  basePath: '/api',
  docEndpoint: '/api-docs',
  apis: [path.resolve(__dirname, '../**/interface/http/**/*.js')],
};

const db = {
  development: {
    client: 'postgresql',
    connection: {
      database: Env.string('DATABASE_DB', 'find_a_dish_dev'),
      port: Env.number('DATABASE_PORT', 5432),
      user: Env.string('DATABASE_USER', 'postgres'),
      password: Env.string('DATABASE_PASSWORD', 'postgres'),
      host: Env.string('DATABASE_HOST', '127.0.0.1'),
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      database: Env.string('TEST_DATABASE_DB', 'find_a_dish_test'),
      port: Env.number('TEST_DATABASE_PORT', 5432),
      user: Env.string('TEST_DATABASE_USER', 'postgres'),
      password: Env.string('TEST_DATABASE_PASSWORD', 'postgres'),
      host: Env.string('TEST_DATABASE_HOST', '127.0.0.1'),
    },
  },

  production: {
    client: 'find_a_dish',
    connection: {
      database: Env.string('DATABASE_NAME', 'find_a_dish'),
      port: Env.number('DATABASE_PORT', 5432),
      user: Env.string('DATABASE_USER', 'postgres'),
      password: Env.string('DATABASE_PASSWORD', 'postgres'),
      host: Env.string('DATABASE_HOST', '127.0.0.1'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

const config = { env, http, swagger, db };

module.exports = config;
