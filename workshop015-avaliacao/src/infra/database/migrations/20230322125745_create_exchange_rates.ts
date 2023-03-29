import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exchange_rates', (table) => {
    table.string('origin_currency').notNullable();
    table.string('destination_currency').notNullable();
    table.float('rate').notNullable();
    table.primary(['origin_currency', 'destination_currency']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('exchange_rates');
}
