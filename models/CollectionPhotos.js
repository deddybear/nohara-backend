"use strict";
import { Model } from "objection";
import knex from "../config/knex.js";
Model.knex(knex);

class CollectionPhotos extends Model {
  static get tableName() {
    return "collection_photos";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string"},
        path: { type: "string" },
        created_at: { type: "string" },
        deleted_at: { type: "string" },
      },
    };
  }
}

export default CollectionPhotos;
