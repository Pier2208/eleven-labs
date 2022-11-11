const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Aristote35",
  host: "localhost",
  port: 5432,
  database: "elevenlabs"
});

module.exports = pool;