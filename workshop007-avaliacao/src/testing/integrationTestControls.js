const supertest = require('supertest');
const knexCleaner = require('knex-cleaner');
const { boot } = require('../_boot/boot');

const setupIntegrationTest = async () => {
  const context = await boot();

  return {
    request: () => supertest(context.server),
    prepareEach: () =>
      knexCleaner.clean(context.knex, {
        ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
      }),
    cleanup: () => context.knex.destroy(),
  };
};

module.exports = { setupIntegrationTest };
