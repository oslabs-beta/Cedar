const { Pool } = require('pg')

const uri = 'postgres://cjqrxfdu:ruHJ-xNG53ofFimQW2zVtnrWtyjqmBO2@isilo.db.elephantsql.com/cjqrxfdu'

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