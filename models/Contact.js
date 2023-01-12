const { knex } = require("../config/knex");
const { Model } = require("objection");

Model.knex(knex);

class Contact extends Model {
  static get tableName() {
    return "contact";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
        type: 'object',
        required: ['desc_company', 'address', 'no_wa', 'no_telephone', 'email', 'facebook', 'instagarm', 'tiktok'],
        properties: {
            id: {type: 'string', format: 'uuid'},
            desc_company: {type: 'string'},
            address: {type: 'string'},
            no_wa: {type: 'number'},
            no_telephone: {type: 'number'},
            email: {type: 'string', format: 'email'},
            facebook: {type: 'string'},
            instagarm: {type: 'string'},
            tiktok: {type: 'string'},
            updated_at: {type: 'string', format: 'date_time'}
        }
    }
  }
}

module.exports = Contact;