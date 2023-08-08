import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable('balance_snapshots', (table) => {
      table.uuid('id').primary();
      table.uuid('ledger_id').notNullable().references('id').inTable('ledgers');
      table.timestamp('created_at').notNullable();
    }),

    knex.schema.createTable('balance_snapshot_entries', (table) => {
      table.uuid('balance_snapshot_id').notNullable().references('id').inTable('balance_snapshots');
      table.integer('amount').notNullable();
      table.string('currency').notNullable();
      table.primary(['balance_snapshot_id', 'currency']);
    }),
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([knex.schema.dropTable('balance_snapshots'), knex.schema.dropTable('balance_snapshot_entries')]);
}
