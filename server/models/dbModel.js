const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Cedar'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


  const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    arn: { type: String, required: true },
    region: { type: String, default: 'us-east-2', required: true },
  });

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    return next();
  })
})

module.exports = mongoose.model('User', userSchema)
















// const { Pool } = require('pg')

// const dotenv = require('dotenv');
// dotenv.config();



// const uri = process.env.DB_URI;

// const pool = new Pool({
//   connectionString: uri,
// });

// //database model
// // CREATE TABLE users (
// //   user_id SERIAL PRIMARY KEY NOT NULL,
// //   username varchar(255) NOT NULL,
// //   password varchar(255) NOT NULL
// //   );

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback);
//   }
// }