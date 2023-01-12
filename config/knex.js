import knexfile from "../knexfile.js"
import knex from "knex";
/**
 * connection with database mysql
 * infomation u can see at directory root filename knexflie.js
 */


export default knex(
    knexfile.development
);