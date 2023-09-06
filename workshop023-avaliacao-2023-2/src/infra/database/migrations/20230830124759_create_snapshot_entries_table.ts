import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('balance_snapshot_entries', (table) => {
    table.uuid('balance_snapshot_id').notNullable().references('id').inTable('balance_snapshots').onDelete('CASCADE');
    table.integer('amount').notNullable();
    table.string('currency').notNullable();
    table.primary(['balance_snapshot_id', 'currency']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('balance_snapshots_entries');
}
