const {
  CloudWatchClient,
  GetMetricDataCommand
} = require('@aws-sdk/client-cloudwatch');

//require in utility functions
const utilities = require('./utilities.js')

//require dotenv to read from .env file and grab credentials 
const dotenv = require('dotenv');
dotenv.config();

const creds = {
  region: process.env.AWS_REGION,
  credential: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
};

//declare a client as a new cloudwatch client passing in creds object
const metricClient = new CloudWatchClient(creds);

//this is what we will attatch middleware onto and export
const metricController = {};

metricController.getMetrics = async (req, res, next) => {
  try {
    //pull variables off of req.body
    //funcs and metrics will be arrays
    const { start, end, funcs, metrics } = req.body;
    console.log(start, end, funcs, metrics)

    const prepAndSend = async (dataArr = [], nextToken = null, params = null) => {
      //if params variable is null (this is the first time we're invoking this func)
      //invoke the prepMetricParameters function in the utilities file to populate params
      if (!params) params = utilities.prepMetricParams(start, end, funcs, metrics);

      //if nextToken is not null, add it to params
      if (nextToken) params.NextToken = nextToken;
  
      //declare command variable to be a new get metric data command passing in params 
      const metricCommand = new GetMetricDataCommand(params);
  
      //attatch result of sending the command to a variable 
      const metricData = await metricClient.send(metricCommand);
      
      dataArr.push(metricData.MetricDataResults);
      console.log('data', dataArr);
      //if metricData receives a next token, 
      //call the function recursively passing in the next token
      return !metricData.NextToken ? dataArr.flat() : prepAndSend(dataArr, metricData.NextToken, params);
    }
    
    //this is hacky im sorry 
    const response = await prepAndSend();

    const data = [];
    
    response.forEach(el => {
      if (el.Timestamps.length && el.Values.length){
        data.push({ 
          functionName: funcs[Number(el.Id[el.Id.length - 1])],
          metricName: el.Label,
          timeStamps: el.Timestamps,
          values: el.Values
        })
      }
    });

    res.locals.metricsData = data;
    return next();
  } catch (err) {
    console.log('error', err)
  }

}

// [
//   {
//     functionName:
//     metricName:
//     timeStamps: [ts1, ts2, ... ], // UNIX timestamps?
//     Values: [val1, val2, ...]
//   },
// ]



module.exports = metricController;