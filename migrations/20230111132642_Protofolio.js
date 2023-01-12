/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('protofolio', function(column) {
    column.uuid('id')
    column.uuid('photos_id').notNullable()
    column.string('name', 50).notNullable()
    column.timestamp('created_at')
    column.timestamp('deleted_at')
    column.index('photos_id')
    column.primary('id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('protofolio');
};
