const {CloudWatchLogsClient, FilterLogEventsCommand, DescribeLogStreamsCommand} = require('@aws-sdk/client-cloudwatch-logs');
const dotenv = require('dotenv');
dotenv.config();

const creds = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	}
  };

const cloudWatchLogsClient = new CloudWatchLogsClient(creds)

//below are lines 9-17 from https://github.com/oslabs-beta/ASTRO/blob/main/server/controllers/aws/Logs/getLogs.js

const getLogs = async (req, res, next) => {
	// append name of function to the format necessary for grabbing logs
	const logGroupName = '/aws/lambda/' + req.body.function;

	// start a new CloudWatchLogsClient connection with provided region and credentials
	const cwLogsClient = new CloudWatchLogsClient({
		region: req.body.region,
		credentials: req.body.credentials,
	});