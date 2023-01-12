/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('contact', function(column) {
        column.uuid('id')
        column.text('desc_company').notNullable()
        column.text('address').notNullable()
        column.string('whatsapp', 20).notNullable()
        column.string('telephone', 20).notNullable()
        column.string('email', 50).notNullable()
        column.text('facebook').notNullable()
        column.text('instagarm').notNullable()
        column.text('tiktok').notNullable()
        column.timestamp('updated_at')
        column.primary('id')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('contact');
};
