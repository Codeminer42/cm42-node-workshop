/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('ingredients', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.integer('amount').unsigned().notNullable();
    table.string('unit', 3).notNullable();
    table.uuid('recipe_id').index().references('id').inTable('recipes').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('ingredients');
};
