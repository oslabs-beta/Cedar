//require in utilities from the functionUtilities file
const utilities = require('./utilities/functionUtilities.js')

//this is what we will attatch middleware onto and export
const functionController = {};

functionController.getFuncs = async (req, res, next) => {
  try {
    const { region } = res.locals.info
    const { accessKeyId, secretAccessKey, sessionToken } = res.locals.creds
    console.log(res.locals.creds)
    console.log(region)
    //declare params 
    const params = {
      FunctionVersion: 'ALL',
    };

    //set up creds to be passed into the lambda client
    const creds = {
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken
      }
    }

    //attatch the result of calling the sendCommand func to res.locals
    //sendCommand is located in the utilities directory in the functionUtilities file
    const lambdaFuncs = await utilities.sendCommand(params, creds);
    res.locals.data = {creds, lambdaFuncs};
    console.log('~~~SUCCESS~~~')
    return next();
  } catch (err) {
    console.log('~~~ERROR~~~', err)
    return next({
      log: 'An error occurred in functionController.getFuncs middleware',
      message: {err: 'An error occurred while gathering lambda functions'}
    })
  };
};

module.exports = functionController;
