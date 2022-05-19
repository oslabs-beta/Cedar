/* ~~~~~~~~ * UTILITY FUNCTIONS FOR FUNCTION CONTROLLER * ~~~~~~~~ */

const { 
  LambdaClient, 
  ListFunctionsCommand 
} = require('@aws-sdk/client-lambda');

const utilities = {};

/* ~~~~~~~~ * SEND COMMAND FUNCTION * ~~~~~~~~ */


utilities.sendCommand = async(params, creds,  funcArr = [], nextToken = null) => {

  //if a next token is provided, add it to the param obj
  if (nextToken) params.nextMarker = nextToken;
      
  // initiate a client as a new lambda client with credentials object
  console.log(creds)
  const lambdaClient = new LambdaClient(creds);

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
  return !response.nextMarker ? funcArr : utilities.sendCommand(params, funcArr, response.nextMarker);
};

module.exports = utilities;
