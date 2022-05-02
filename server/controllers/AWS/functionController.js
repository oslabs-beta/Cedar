
const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
//dotenv is how we're getting our credentials
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

const params = { FunctionVersion: 'ALL'}

// initiate LambdaClient with credentials object
const lambdaClient = new LambdaClient(creds);

// initiate a command (object instance) with required input parameters
const command = new ListFunctionsCommand(params);

const functionController = {};

functionController.getFuncs = async (req, res, next) => {
  try {
    // call send method on the client with command object as the argument
    const returnedData = await lambdaClient.send(command);
    console.log('~~~~~SUCCESS!~~~~~');
  
    const funcArr = [];
    returnedData.Functions.forEach(func => {
      funcArr.push({ functionName: func.FunctionName });
    })

    res.locals.lambdaFuncs = funcArr;
    return next();

    //need a helper funciton for recursive calls
    // ListFunctionsCommand will return up to 50 lambda functions 
    // so we have to account for if there are more than 50 functions
    // if (!returnedData.NextMarker){
    //   res.locals.lambdaFuncs = returnedData.Functions;
    // } else {
    //   getFuncs(params = { FunctionVersion: 'ALL', Marker: returnedData.NextMarker }, funcArr);
    // }
  } catch (err) {
    console.log('~~~ERROR~~~', err);
  };
};

module.exports = functionController;