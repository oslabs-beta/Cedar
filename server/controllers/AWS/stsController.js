//require in utility functions
const utilities = require('./utilities/stsUtilities.js')

//this is what we will attatch middleware onto and export
const stsController = {};

stsController.getCreds = async (req, res, next) => {
  //pull variables off of res.locals coming from userController.login
  const { arn, region } = res.locals

  try{
    const credentials = await utilities.prepAndSend(arn, region);
    res.locals.creds = credentials
    return next();
  } catch (err){
    return next({
      log: `error caught in stsController.getCreds: ${err}`,
      message:  {err: 'an error occurred while attempting to access credentials in'}
    })
  }
}

module.exports = stsController;
