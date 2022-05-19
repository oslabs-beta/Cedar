const User = require('../models/dbModel.js');

const cookieController = {};

cookieController.setCookie = async (req, res, next) => {
  console.log('hello i am the cookie controller')
  const { username } = req.body;

  try{
    //find user in database, we will use the id as the cookie value
    const data = await User.findOne({username});
    res.cookie('ssid', data._id, { httpOnly: true });
    console.log('hello leaving cookies controller')
    //send the id on res.locals to create a session
    res.locals.ssid = data._id
    return next();
  } catch (err) {
    return next({
      log: `error caught in cookieController.setCookie: ${err}`,
      message: {err: 'an error occurred while attempting to bake cookies'}
    })
  }
}

module.exports = cookieController;
