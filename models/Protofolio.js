"use strict";
import { Model } from "objection";
import knex from "../config/knex.js";
import CollectionPhotos from "./CollectionPhotos.js";


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
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "string" },
        photos_id: { type: "string" },
        name: { type: "string", minLength: 5, maxLength: 50 },
        created_at: { type: "string" },
        deleted_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      CollectionPhotos: {
        relation: Model.HasOneRelation,
        modelClass: CollectionPhotos,
        join: {
          from: "protofolio.photos_id",
          to: "collection_photos.id",
        },
      },
    };
  }
}

export default Protofolio;
