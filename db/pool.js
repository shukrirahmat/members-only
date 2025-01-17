require("dotenv").config();
const {Pool} = require("pg");

const localConnection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`;
const remoteConnection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}?sslmode=require`;

const pool = new Pool({
    connectionString : process.env.BUILD == "local" ? localConnection : remoteConnection
})

module.exports = pool;

