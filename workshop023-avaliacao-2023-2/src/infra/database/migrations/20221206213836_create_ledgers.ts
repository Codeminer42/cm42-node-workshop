import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ledgers', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable().index().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ledgers');
}
