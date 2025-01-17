require("dotenv").config();
const {Pool} = require("pg");

const connection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`;

const pool = new Pool({
    connectionString : connection
})

module.exports = pool;

