/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(column) {
        column.uuid('id');
        column.string('username', 8)
        column.string('email', 100)
        column.string('name', 50);
        column.index('photos_id');
        column.primary('id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
