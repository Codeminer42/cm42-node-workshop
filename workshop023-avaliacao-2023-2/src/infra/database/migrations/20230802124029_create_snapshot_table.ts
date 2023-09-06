import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('balance_snapshots', (table) => {
    table.uuid('id').primary();
    table.uuid('ledger_id').notNullable().references('id').inTable('ledgers');
    table.timestamp('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('balance_snapshots');
}
