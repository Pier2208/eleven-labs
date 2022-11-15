const { Pool } = require('pg');
require('dotenv').config();

const config = {
  dev: { user: process.env.USER_DB, password: process.env.PASSWORD_DB, host: process.env.HOST_DB, port: process.env.PORT_DB, database: process.env.DATABASE },
  prod: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
};
const pool = new Pool(process.env.NODE_ENV === 'production' ? config.prod : config.dev);

module.exports = pool;
