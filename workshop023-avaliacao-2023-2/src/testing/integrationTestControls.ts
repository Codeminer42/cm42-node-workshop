import supertest from 'supertest';
import knexCleaner from 'knex-cleaner';
import { boot } from '../_boot/boot';
import { entryFactory } from './factories/EntryFactory';

const setupIntegrationTest = async () => {
  const context = await boot();

  return {
    request: supertest(context.server),

    prepareEach: () =>
      knexCleaner.clean(context.knex, {
        ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
      }),

    cleanup: () => context.knex.destroy(),

    entryFactory: entryFactory,
  };
};

export { setupIntegrationTest };
export type IntegrationTestControls = Awaited<ReturnType<typeof setupIntegrationTest>>;
