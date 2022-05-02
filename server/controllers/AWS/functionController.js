const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
//require dotenv so we can read the credentials stored in .env file
const dotenv = require('dotenv');
dotenv.config();

  //for credentials we need region, access key and secret access key
  const creds = {
    region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
  };

// initiate a client as a new lambda client with credentials object
const lambdaClient = new LambdaClient(creds);

//this is what we will attatch middleware onto and export
const functionController = {};

functionController.getFuncs = async (req, res, next) => {
  try {

    const sendCommand = async(funcArr = [], nextToken = null) => {
      //declare params 
      const params = {
        FunctionVersion: 'ALL',
      };
      //if a next token is provided, add it to the param obj
      if (nextToken) params.nextMarker = nextToken;
      
      // initiate a command (object instance) with required input parameters
      const command = new ListFunctionsCommand(params);

      //send the command and attatch the response to a variable
      const response = await lambdaClient.send(command);

      //push functions into funcArr so we can either return the array or return
      //or pass the array to the recursive call is there is a next token
      response.Functions.forEach(func => {
        funcArr.push({ functionName: func.FunctionName });
      });

      //check for next marker and recursively call the func if one exists,
      //otherwise we just return the funcArr
      return !response.nextMarker ? funcArr : sendCommand(funcArr, response.nextMarker);
      };

    //attatch the result of sendCommand invocation to res.locals
    res.locals.lambdaFuncs = await sendCommand();
    console.log('~~~SUCCESS~~~')
    return next();
  } catch (err) {
    return next({
      log: 'An error occurren in functionController.getFuncs middleware',
      message: {err: 'An error occurred while gathering lambda functions'}
    })
  };
};

module.exports = functionController;