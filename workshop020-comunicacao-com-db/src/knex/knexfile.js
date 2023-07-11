const { join } = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    debug: true,
    client: 'postgresql',
    connection: {
      database: 'db',
      user: 'postgres',
      password: 'postgres',
      host: 'localhost',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: join(__dirname, 'migrations')
    },
  },
};
