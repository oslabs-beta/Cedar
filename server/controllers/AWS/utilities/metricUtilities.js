/* ~~~~~~~~~~ * UTILITY FUNCTIONS FOR METRIC CONTROLLER * ~~~~~~~~~~ */

const {
  CloudWatchClient,
  GetMetricDataCommand
} = require('@aws-sdk/client-cloudwatch');


const utilities = {};

/* ~~~~~~~~~~ * PARAMETER PREP * ~~~~~~~~~~*/

utilities.prepAndSend = (start, end, funcs, metrics, creds) => {

  //declare a client as a new cloudwatch client passing in creds object
  const metricClient = new CloudWatchClient(creds);

  params = {
    EndTime: new Date(end),
    StartTime: new Date(start),
    MetricDataQueries: []
  };

  //declare a count variable
  //this will be used to create a unique Id for each parameter object
  let count = 0;
  //populate MetricDataQueries array using a sad loop
  //func loop
  for (let i = 0; i < funcs.length; i += 1){
    //metric loop
    for (let j = 0; j < metrics.length; j += 1){
      count += 1
      params.MetricDataQueries.push({
        Id: `m${count}_func${i}`,
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
  return utilities.sendCommand(metricClient, params);
}

/* ~~~~~~~~~~ * SEND COMMAND * ~~~~~~~~~~ */

utilities.sendCommand = async (metricClient, params, dataArr = [], nextToken = null) => {
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

/* ~~~~~~~~~~ * PARSE DATA * ~~~~~~~~~~ */
    //parse through the response to create an object
    /* we will send data back to the front end in this format */

    /* {                                                      */
    /*    functionName: {                                     */
    /*       metrics: [                                       */
    /*          {                                             */
    /*            metricName: {                               */
    /*                timestamps : [a, b, c]                  */
    /*                vals: [x, y, z]                         */
    /*             }                                          */
    /*          }                                             */  
    /*       ]                                                */
    /*    }                                                   */
    /* }                                                      */

utilities.parseData = async (response, funcObj) => {
  //create a cache object
  const cache = {};
    
  //loop through data
  response.forEach(el => {

    //first find the name of the current function
    //loop through the elements id and slicing off the name
    //after the underscore
    //this value represents the key in the funcObj with the value of the function name
    let currFunc = ''
        
    for (let i = 0; i < el.Id.length; i += 1){
      if (el.Id[i - 1] === '_'){
        funcName = el.Id.slice(i);
        currFunc = funcObj[funcName];
      }
    }

    //check if the function name has a key in the cache object
    //if it doesn't exist, we create the key 
    //the value will be an object with a metrics key with the value of an array
    if (!cache[currFunc]){
      cache[currFunc] = { metrics  : [] }
          
      //create an object to add the timestamps and values of the current element onto
      const obj = {};

      obj[el.Label] = { 
        timestamps: el.Timestamps,
        vals: el.Values
      };
        
      //push the object into the metrics array
      cache[currFunc].metrics.push(obj);
    } else {
      //if the key exists, we have to check the metric key to see if the metric exists

      //create a variable to represent the metrics key on the current function key in the cache object
      const metricsInCache = cache[currFunc].metrics;

      //set a flag for if the metric is found in the metrics array to false
      let metricFound = false;

      //loop through the metrics array
      for (let i = 0; i < metricsInCache.length; i++) {
        //if we find the metric in the array,
        //concat the values of the current elements metrics to the correct keys
        if (metricsInCache[i][el.Label]){
          //set the metric found flag to true so the next code block isn't triggered
          metricFound = true;
          metricsInCache[i][el.Label].timestamps = metricsInCache[i][el.Label].timestamps.concat(el.Timestamps),
          metricsInCache[i][el.Label].vals = metricsInCache[i][el.Label].vals.concat(el.Values);
          break;
        };
      };
          
      //if we break out of the loop and metric found is false
      //we need to add the metrics to the metrics array
      if (!metricFound){
        const obj = {};
        obj[el.Label] = { 
          timestamps: el.Timestamps,
          vals: el.Values
        }
        cache[currFunc].metrics.push(obj);
      } 
    }
  });
  return cache;
};


module.exports = utilities;
