//require in utilities from the functionUtilities file
const utilities = require('./utilities/functionUtilities.js')

//this is what we will attatch middleware onto and export
const functionController = {};

functionController.getFuncs = async (req, res, next) => {
  try {
    //declare params 
    const params = {
      FunctionVersion: 'ALL',
    };

    //attatch the result of calling the sendCommand func to res.locals
    //sendCommand is located in the utilities directory in the functionUtilities file
    res.locals.lambdaFuncs = await utilities.sendCommand(params);
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
