import knexfile from "../knexfile"

/**
 * connection with database mysql
 * infomation u can see at directory root filename knexflie.js
 */

const knex = require("knex") (
    knexfile.development
)

module.exports = knex;