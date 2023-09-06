import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('balance_snapshots', (table) => {
    table.uuid('ledger_id').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('balance_snapshots', (table) => {
    table.uuid('ledger_id').notNullable().alter();
  });
}
