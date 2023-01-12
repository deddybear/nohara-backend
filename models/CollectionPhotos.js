const { knex } = require("../config/knex");
const { Model } = require("objection");

Model.knex(knex)

class CollectionPhotos extends Model {

    static get tableName() {
        return 'collection_photos'
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
                path : {type: 'string'},
                created_at: {type: 'string', format: 'date_time'},
                deleted_at: {type: 'string', format: 'date_time'}
            }
        };
    }
}

module.exports = CollectionPhotos;