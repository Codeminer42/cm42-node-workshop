import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('entries', (table) => {
    table.uuid('id').primary();
    table.uuid('ledger_id').notNullable().references('id').inTable('ledgers');
    table.integer('kind').notNullable();
    table.integer('amount').notNullable();
    table.string('currency_symbol').notNullable();
    table.timestamp('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('entries');
}
