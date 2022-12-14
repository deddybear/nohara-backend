/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(column) {
        column.uuid('id')
        column.string('username', 8).notNullable()
        column.string('password', 255).notNullable()
        column.string('email', 100).notNullable()
        column.string('name', 50).notNullable()
        column.timestamp('created_at')
        column.timestamp('updated_at')
        column.timestamp('verified_at')
        column.timestamp('deleted_at')
        column.primary('id')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
