//require in bcrypt and declare salt work factor
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//require in db from dbModel
const User = require('../models/dbModel.js');
const Session = require('../models/sessionModel.js')

//controller to login and signup
const userController = {};

//signup controller
userController.signUp = async (req, res, next) => {
  //username and password will be coming in on request body
  const { username, password, arn, region } = req.body;
  try{ 
    //make query to db
    await User.create({username, password, arn, region});
    console.log('signup successful')
    return next();
  } catch (err) {
    return next({
      log: `error caught in userController.signUp: ${err}`,
      message: {err: 'an error occurred while attempting to register a user'}
    })
  }
}

//login controller
userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log('req body', req.body)
  try{
    await Session.deleteOne({ cookieId: "62858f194165138887380e06" })
    //save awaited db response to variable to use with bcrypt compare
    const data = await User.findOne({username});
    //not sure if this is right but trying to figure out how to know if the user doesnt exist
    if (!data) throw new Error ('username or password is incorrect');
  
    //compare db password to password on req body
    //password will be store in data.rows[0].password
    const verified = await bcrypt.compare(password, data.password);
    //if verified returns false throw and error
    if (!verified) throw new Error ('username or password is incorrect');
    const { arn, region } = data
    res.locals.info = {arn, region};
    return next();
  } catch (err) {
    return next({
      log: `error caught in userController.login: ${err}`,
      message: {err: 'an error occurred while attempting to log in'}
    })
  }

}


module.exports = userController;