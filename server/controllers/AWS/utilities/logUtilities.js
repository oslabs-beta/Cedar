/* ~~~~~~~~ * UTILITY FUNCTIONS FOR LOG CONTROLLER * ~~~~~~~~ */

const {
  CloudWatchLogsClient, 
	FilterLogEventsCommand, 
} = require('@aws-sdk/client-cloudwatch-logs');

const utilities = {};

/* ~~~~~~~~ * SEND COMMAND FUNCTION * ~~~~~~~~ */

utilities.sendCommand = async (creds, params, data = [], nextToken = null) => {
  //declare param variable set to value of prepParms function
  // const params = await prepParams(start, end, func, ...args);
  if (nextToken) params.nextToken = nextToken

  //declare a client as an new coutwatch logs client passing in credentials
  const cloudWatchLogsClient = new CloudWatchLogsClient(creds);

  //declare command initialized to be a new filter log event command 
  const command = new FilterLogEventsCommand(params);

  //send the command and attatch the response to a variable
  const response = await cloudWatchLogsClient.send(command);
  
  //push results into the data array so we can either return them 
  //or pass them into the recursive call upon receiving a next token
  data.push(response.events);

  //check to see if there is a next token, if not return the data array
  //otherwise recursively call the function passing in the populated data array and token
  return !response.nextToken ? data.flat() : utilities.sendCommand(params, data, response.nextToken);

};

module.exports = utilities;
