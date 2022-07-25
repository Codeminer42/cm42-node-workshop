/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('steps', (table) => {
    table.uuid('id').primary();
    table.string('description').notNullable();
    table.integer('position').notNullable();
    table.uuid('recipe_id').index().references('id').inTable('recipes').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('steps');
};
