/* ~~~~~~~~ * UTILITY FUNCTIONS FOR FUNCTION CONTROLLER * ~~~~~~~~ */

const { 
  LambdaClient, 
  ListFunctionsCommand 
} = require('@aws-sdk/client-lambda');

// const creds = require('./creds.js');

const creds = {
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'ASIATPE5RJNP34STUHZG',
    secretAccessKey: 'BkxTzwld70ahlJksV5nGJg+yD7yk0XexpRuAdZ6f'
  }
}

// initiate a client as a new lambda client with credentials object
const lambdaClient = new LambdaClient(creds);

const utilities = {};

/* ~~~~~~~~ * SEND COMMAND FUNCTION * ~~~~~~~~ */


utilities.sendCommand = async(params, funcArr = [], nextToken = null) => {

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
  return !response.nextMarker ? funcArr : utilities.sendCommand(params, funcArr, response.nextMarker);
};

module.exports = utilities;
