//require in bcrypt and declare salt work factor
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//require in db from dbModel
const db = require('../models/dbModel.js');

//controller to login and signup
const userController = {};


//signup controller
userController.signUp = async (req, res, next) => {
  //username and password will be coming in on request body
  const { username, password } = req.body;
  try{ 
    //declare param array to sanitize and scrub the db query
    const params = [username, password]
    //create query string 
    const queryStr = 'INSERT INTO users(username, password) VALUES ($1, $2);';
    //make query to db
    await db.query(queryStr, params);
    return next();
  } catch (err) {
    return next({
      log: 'error caught in userController.signUp',
      message: {err: 'an error occurred while attempting to register a user'}
    })
  }
}

//login controller
userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  try{
    const params = [username, password];
    const queryStr = 'SELECT password FROM users WHERE username = $1;';
    //save awaited db response to variable to use with bcrypt compare
    const data = await db.query(queryStr, params);
    //compare db password to password on req body
    //password will be store in data.rows[0].password
    const verified = await bcrypt.compare(password, data.rows[0].password);
    //if verified returns false throw and error
    if (!verified){
      throw new Error ('username or password not verified');
    }
    return next();
  } catch (err) {
    return next({
      log: 'error caught in userController.login',
      message: {err: 'an error occurred while attempting to log in'}
    })
  }

}


module.exports = userController;