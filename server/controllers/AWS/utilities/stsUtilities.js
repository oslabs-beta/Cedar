/* ~~~~~~~~~~ * UTILITY FUNCTIONS FOR STS CONTROLLER * ~~~~~~~~~~ */

const { 
  STSClient, 
  AssumeRoleCommand 
} = require("@aws-sdk/client-sts");

const utilities = {};

/* ~~~~~~~~~~ * PREP AND SEND COMMAND * ~~~~~~~~~~ */

utilities.prepAndSend = async (arn, region) => {

  console.log('here is region', region)
  console.log('here is arn', arn)
  
  const creds = {
    region: region,
  }
  //declare a client as a new STS client passing in creds
  const stsClient = new STSClient(creds);

  //declare params to pass into the assume role command
  //these will be a string indicating the session name 
  //and the arn generated from the user creating the cedar stack
  const params = {
    RoleSessionName: 'Cedar_Session',
    RoleArn: arn
  }
  console.log('params', params)
  const command = new AssumeRoleCommand(params)

  const data = await stsClient.send(command)
  return data.Credentials;
}


module.exports = utilities;
