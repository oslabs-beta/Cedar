const {CloudWatchLogsClient, 
	FilterLogEventsCommand, 
} = require('@aws-sdk/client-cloudwatch-logs');

//require in dotenv to read .env file 
const dotenv = require('dotenv');
dotenv.config();

//this is what we will be exporting and attatching middleware onto
const logController = {};

//grab credentials from .env file and assign them to creds object
const creds = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	}
  };

//declare a client as an new coutwatch logs client passing in credentials
const cloudWatchLogsClient = new CloudWatchLogsClient(creds);

//declare function to prep parameters for command
const prepParams = (start, end, func, nextToken = null) => {
  const params = {};
  
  params.endTime = end * 1000;
  params.startTime = start * 1000;
  params.logGroupName = '/aws/lambda/' + func;

  if (nextToken) params.nextToken = nextToken;

  return params;
}


logController.getLogs = async (req, res, next) => {
  try {
    //grab start, end, and functions from req.body
    const { start, end, func } = req.body;
  
    const prepAndSend = async (data = [], ...args) => {
    //declare param variable set to value of prepParms function
    const params = await prepParams(start, end, func, ...args);

    //declare command initialized to be a new filter log event command 
    const command = new FilterLogEventsCommand(params);
  
    //send the command and attatch the response to a variable
    const response = await cloudWatchLogsClient.send(command);
    
    //push results into the data array so we can either return them 
    //or pass them into the recursive call upon receiving a next token
    data.push(response.events);

    //check to see if there is a next token, if not return the data array
    //otherwise recursively call the function passing in the populated data array and token
    if (!response.nextToken){
      return data.flat();
      } else {
      return prepAndSend(data, response.nextToken);
    };
  };
  
    //attatch the response from the prepAndSend function to res.locals
    res.locals.logs = await prepAndSend();
    console.log('~~~SUCCESS~~~')
    return next();
  } catch (err){
    return next({
      log: 'An error occurred in logController.getLogs middleware',
      message: {err: 'An error occurred while retreiving logs'}
    })
  }  
}

module.exports = logController;