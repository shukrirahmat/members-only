require("dotenv").config();
const {Pool} = require("pg");

const connectionString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?ssl=require`;

const pool = new Pool({
    connectionString
})

module.exports = pool;

