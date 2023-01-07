/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('caraousel', function(column) {
    column.increments('id');
    column.uuid('photos_id');
    column.string('name', 50);
    column.index('photos_id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('caraousel');
};
