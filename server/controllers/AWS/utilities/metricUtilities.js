/* ~~~~~~~~~~ * UTILITY FUNCTIONS FOR METRIC CONTROLLER * ~~~~~~~~~~ */

const {
  CloudWatchClient,
  GetMetricDataCommand
} = require('@aws-sdk/client-cloudwatch');

const creds = require('./creds.js');

//declare a client as a new cloudwatch client passing in creds object
const metricClient = new CloudWatchClient(creds);

const utilities = {};

/* ~~~~~~~~~~ * PARAMETER PREP * ~~~~~~~~~~*/

utilities.prepAndSend = (start, end, funcs, metrics) => {
  params = {
    EndTime: new Date(end),
    StartTime: new Date(start),
    MetricDataQueries: []
  };

  //populate MetricDataQueries array using a sad loop

  //func loop
  for (let i = 0; i < funcs.length; i += 1){
    //metric loop
    for (let j = 0; j < metrics.length; j += 1){
      params.MetricDataQueries.push({
        //create a unique id using the metric name and func index
        Id: `m${metrics[j]}_${i}`,
        Label: metrics[j],
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: metrics[j],
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: funcs[i]
              }
            ],
          },
          Period: 60,
          Stat: 'Sum'
        },
      });
    }
  }
  //call the sendCommand function passing in the prepped parameters
  return utilities.sendCommand(params);
}

/* ~~~~~~~~~~ * SEND COMMAND * ~~~~~~~~~~ */

utilities.sendCommand = async (params, dataArr = [], nextToken = null) => {
  //if nextToken is not null, add it to params
  if (nextToken) params.NextToken = nextToken;

  //declare command variable to be a new get metric data command passing in params 
  const metricCommand = new GetMetricDataCommand(params);

  //attatch result of sending the command to a variable 
  const metricData = await metricClient.send(metricCommand);
  
  dataArr.push(metricData.MetricDataResults);

  //if metricData receives a next token, 
  //call the function recursively passing in the next token
  return !metricData.NextToken ? dataArr.flat() : utilities.sendCommand(params, dataArr, metricData.NextToken);
}


module.exports = utilities;