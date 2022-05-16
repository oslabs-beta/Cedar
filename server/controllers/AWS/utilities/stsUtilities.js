/* ~~~~~~~~~~ * UTILITY FUNCTIONS FOR STS CONTROLLER * ~~~~~~~~~~ */

const { 
  STSClient, 
  AssumeRoleCommand 
} = require("@aws-sdk/client-sts");

const creds = require('./creds.js');

const utilities = {};

/* ~~~~~~~~~~ * PREP AND SEND COMMAND * ~~~~~~~~~~ */

utilities.prepAndSend = async (arn, region) => {

  //declare a client as a new STS client passing in creds
  const stsClient = new STSClient(region);

  //declare params to pass into the assume role command
  //these will be a string indicating the session name 
  //and the arn generated from the user creating the cedar stack
  const params = {
    RoleSessionName: 'Cedar_Session',
    RoleArn: arn
  }

  const command = new AssumeRoleCommand(params)

  const data = await stsClient.send(command)
  return data.Credentials;
}


module.exports = utilities;
