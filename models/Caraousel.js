"use strict";
import { Model } from "objection";
import knex from "../config/knex.js";
import CollectionPhotos from "./CollectionPhotos.js";

Model.knex(knex);
// https://www.youtube.com/watch?v=lPlgRp6-CqU
class Caraousel extends Model {

  // Table name is the only required property.
  static get tableName() {
    return "caraousel";
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
        type: 'object',
        required: ['name'],
        properties: {
            id : {type : 'string'},
            photos_id : {type: 'string'},
            name: {type: 'string', minLength: 4, maxLength: 50},
            created_at: {type: 'string'},
            deleted_at: {type: 'string'}
        }
    };
  }

  static get relationMappings() {

    return {
        CollectionPhotos: {
            relation: Model.HasOneRelation,
            modelClass: CollectionPhotos,
            join: {
                from: 'caraousel.photos_id',
                to: 'collection_photos.id'
            }
        }
    }
  }
}

export default Caraousel;
