const Session = require('../models/sessionModel.js');
// const User = require('../models/dbModel.js');

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
   console.log('in session controller woo')
   // set cookieID to user ID
   const { ssid } = res.locals;
   try {
     Session.create({ cookieId: ssid });
     console.log('session created');
     return next();
   } catch (err) {
     return next({
      log: `error caught in sessionController.startSession: ${err}`,
      message: {err: 'an error occurred while attempting to create a session'}
     })
   }
}

sessionController.logOut = async (req, res, next) => {

  try {
    console.log('req.cookies', req.cookies)
    await Session.deleteOne({ cookieId: req.cookies.ssid })
    // res.clearCookie('ssid')
    console.log('logout successful')
    return next();
  } catch (err) {
    return next({
      log: `error caught in sessionController.logOut: ${err}`,
      message: {err: 'an error occurred while attempting to log out a user'}
    })
  }
}



module.exports = sessionController;
