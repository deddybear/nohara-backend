"use strict";
// knex seed:run --specific=UsersSeed.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { v4 } from "uuid";
import moment from "moment/moment.js";
import bcrypt from "bcrypt";



export const seed = async function (knex) {
  // Deletes ALL existing entries
  const salt = bcrypt.genSaltSync(10);
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: v4(),
          username: "sudo1",
          password: bcrypt.hashSync("qwerty555", salt),
          email: "test@test.com",
          created_at: moment().local("id").format("YYYY-MM-DD HH:mm:ss"),
        },
      ]);
    });
};
