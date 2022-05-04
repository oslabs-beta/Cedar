//require in utility functions from the logUtilities file
const utilities = require('./utilities/logUtilities.js');

//this is what we will be exporting and attatching middleware onto
const logController = {};

logController.getLogs = async (req, res, next) => {
  try {
    //grab start, end, and functions from req.body
    const { start, end, func } = req.body;

    //declare parameters to be passed into the send command
    const params = { 
      endTime: end,
      startTime: start,
      logGroupName: '/aws/lambda/' + func,
    }

    //attatch the response from the sendCommand function to res.locals
    //sendCommand is located in the utilities directory in the logUtilities file
    res.locals.logs = await utilities.sendCommand(params);
    console.log('~~~SUCCESS~~~')
    return next();
  } catch (err){
    console.log('~~~ERROR~~~', err)
    return next({
      log: 'An error occurred in logController.getLogs middleware',
      message: {err: 'An error occurred while retreiving logs'}
    })
  }  
}

module.exports = logController;
