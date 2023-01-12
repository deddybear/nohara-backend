"use strict";
import { Model } from "objection";
import knex from "../config/knex.js";

Model.knex(knex);

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password", "email", "name"],
      properties: {
        id: { type: "string", format: "uuid" },
        username: { type: "string" },
        password: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string" },
        updated_at: { type: "string", format: "date_time" },
      },
    };
  }
}

export default Users;
