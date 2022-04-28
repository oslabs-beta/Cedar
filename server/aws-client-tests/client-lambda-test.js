const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
const dotenv = require('dotenv');
dotenv.config();

const creds = {
  region: process.env.AWS_REGION.slice(2),
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
};

const lambdaClient = new LambdaClient(creds);

const commandParams = { 
  FunctionVersion: 'ALL',
};

const getFunctions = async() => {
  try {
    const functions = await lambdaClient.send(new ListFunctionsCommand(commandParams));
    console.log('~~~~~~~~~~SUCCESS!~~~~~~~~~~~');
    console.log(functions);
  } catch (err) {
    console.log(`~~~~~~~~~~ERROR!~~~~~~~~~~~\n${err}`);
  }
}

getFunctions();