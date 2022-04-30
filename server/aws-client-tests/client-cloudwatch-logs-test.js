const {CloudWatchLogsClient, 
	FilterLogEventsCommand, 
	DescribeLogStreamsCommand 
} = require('@aws-sdk/client-cloudwatch-logs');

const dotenv = require('dotenv');
dotenv.config();

const creds = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	}
  };

// this is a new comment

const cloudWatchLogsClient = new CloudWatchLogsClient(creds)


//thinking we can create a sort of looping function
//to continuously send the command if we get a next token 

const params = {
	logGroupName: '/aws/lambda/mir-app-HelloWorldFunction-54OVb43xIQbl',
	//nextToken: 'Bxkq6kVGFtq2y_MoigeqscPOdhXVbhiVtLoAmXb5jCrVJ9XKluhvEQW9qQp3xl7QYxdZY4MGGjGiPlMsP6rD36UVeEleHwwccWlYsKOe-0s-iSBnnYoXY4aERY4PEX4ZnzNkZTEg-Z7m_qRtsQXtBZ7muQZTqtmchOdfZXFh0YkPlQ1uhDXIo9EqnJ2WSgPG2ByIA5jCaWVPnzesd7H6L6XnlrFBNzXlF1RB9rvG2CZnNt9NuIAGfGt2eAlkRmPgOr3AxFrmZ20X5gAhXt3lUQ'
}

// const endTime = new Date(end);
// const startTime = new Date(start)
const command = new FilterLogEventsCommand(params);

const getLogs = async () => {
	try {
		const response = await cloudWatchLogsClient.send(command);

		//filter response for only messages containing error
		const array = [];
		response.events.forEach(el => {
			if (el.message.includes('error'))
			array.push(el);
		});
		//console.log('array', array)
		console.log('~~~yay~~~');
		console.log('response', response);
	} catch (err) {
		console.log('error', err);
	}
};

console.log(getLogs());



//below are lines 9-17 from https://github.com/oslabs-beta/ASTRO/blob/main/server/controllers/aws/Logs/getLogs.js

// const getLogs = async (req, res, next) => {
// 	// append name of function to the format necessary for grabbing logs
// 	const logGroupName = '/aws/lambda/' + req.body.function;

// 	// start a new CloudWatchLogsClient connection with provided region and credentials
// 	const cwLogsClient = new CloudWatchLogsClient({
// 		region: req.body.region,
// 		credentials: req.body.credentials,
// 	});