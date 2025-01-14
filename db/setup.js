require("dotenv").config();
const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `

    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS messages;

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR (255),
        lastname VARCHAR (255),
        username VARCHAR (255),
        password VARCHAR (255),
        membership_status VARCHAR (255)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      author_id INTEGER NOT NULL,
      message TEXT,
      date_posted TIMESTAMP NOT NULL
    );
    `;

const localConnection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

async function main(build) {
  console.log("Seeding...");
  const client = new Client({
    connectionString:
      build == "production" ? process.env.CONNECTION_STR : localConnection,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main(argv[2]);
