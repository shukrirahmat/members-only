require("dotenv").config();
const {Pool} = require("pg");

const localConnection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

const pool = new Pool({
    connectionString: process.env.BUILD == "production" ? process.env.CONNECTION_STR : localConnection
})

module.exports = pool;

