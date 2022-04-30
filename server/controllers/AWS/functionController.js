// Request
//  GET
// Response
// Description
//  All of the functions!
//  Array of objectsfunction names (strings)
//  Each object represents a function, and stores properties about that function
//  Currently, only property to include is function name

const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
//dotenv is how we're getting our credentials
const dotenv = require('dotenv');
dotenv.config();
// console.log(dotenv)
// //for credentials we need region, access key and secret access key
const creds = {
  region: process.env.AWS_REGION.slice(2),
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
};
//console.log(creds.region.slice(2));

// // initiate LambdaClient with credentials object
// const lambdaClient = new LambdaClient(creds);



const getFuncs = async (nextToken = null, req, res, next) => {
  //for credentials we need region, access key and secret access key
const creds = {
  region: process.env.AWS_REGION.slice(2),
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
};


// initiate LambdaClient with credentials object
const lambdaClient = new LambdaClient(creds);

  // declare parameters to pass into our command
  // here we are just grabbing all functions so that will be our only param
  const params = {
    // set FunctionVersion parameter to retrieve all functions
    FunctionVersion: 'ALL',
    // set Marker parameter to null so if we receive a response 
      // with a next token we will set the value of Marker to the next token value
    Marker: nextToken,
  };

  // initiate a command (object instance) with required input parameters
  const command = new ListFunctionsCommand(params);

try{
  // call send method on the client with command object as the argument
  const returnedData = await lambdaClient.send(command);
  console.log('~~~~~SUCCESS!~~~~~');
  console.log(returnedData.Functions)

  // ListFunctionsCommand will return up to 50 lambda functions 
      // so we have to account for if there are more than 50 functions
  if (returnedData.NextMarker){
    getFuncs(returnedData.NextMarker, req, res, next);
  } else {
    return next();
  }
} catch (err) {
  console.log('~~~ERROR~~~', err);
};
};

getFuncs();