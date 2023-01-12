const { knex } = require("../config/knex");
const { Model } = require("objection");

Model.knex(knex);

class Protofolio extends Model {
  static get tableName() {
    return "protofolio";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
        type: 'object',
        required: ['name'],
        properties: {
            id : {type : 'string', format: 'uuid'},
            photos_id : {type: 'string', format: 'uuid'},
            name: {type: 'string', minLength: 5, maxLength: 50},
            created_at: {type: 'string', format: 'date_time'},
            deleted_at: {type: 'string', format: 'date_time'}
        }
    };
  }
}

module.exports = Protofolio;
