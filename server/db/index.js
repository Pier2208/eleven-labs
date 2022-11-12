require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

module.exports = pool;