const { Pool } = require('pg')

const dotenv = require('dotenv');
dotenv.config();



const uri = process.env.DB_URI;

const pool = new Pool({
  connectionString: uri,
});

//database model
// CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY NOT NULL,
//   username varchar(255) NOT NULL,
//   password varchar(255) NOT NULL
//   );

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}