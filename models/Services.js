const { knex } = require("../config/knex");
const { Model } = require("objection");

Model.knex(knex);

class Services extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "services";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "id";
  }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "string", format: "uuid" },
        photos_id: { type: "string", format: "uuid" },
        name: { type: "string", minLength: 5, maxLength: 50 },
        created_at: { type: "string", format: "date_time" },
        deleted_at: { type: "string", format: "date_time" },
      },
    };
  }
}

module.exports = Services;
