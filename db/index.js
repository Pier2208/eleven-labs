const { Pool } = require('pg');
require('dotenv').config();

const config = {
  dev: { user: process.env.USER_DB, password: process.env.PASSWORD_DB, host: process.env.HOST_DB, port: process.env.PORT_DB, database: process.env.DATABASE },
  prod: process.env.DATABASE_URL
};
const pool = new Pool(process.env.NODE_ENV === 'production' ? config.prod : config.dev);

module.exports = pool;
