const { Pool } = require('pg')

const uri = ''

const pool = new Pool({
  connectionString: uri,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}