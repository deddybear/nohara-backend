/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('collection_photos', function(column) {
    column.uuid('id')
    column.string('path', 255).notNullable()
    column.timestamp('created_at')
    column.timestamp('deleted_at')
    column.primary('id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('collection_photos');
};
