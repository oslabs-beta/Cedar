import 'regenerator-runtime'

/**
 * Get functions list from aws lambda, and add to state
 * @async
 * @function getFuncs
 * @param {function} setFunctionData - setter function for functionData state
 * @returns {undefined}
 */
export const getFuncs = async (setFunctionData) => {
  try {
    const data = await fetch('/api/aws/getFunctionNames');
    const parsedData = await data.json();
    const functionData = {}
    parsedData.forEach(funcObj => {
      functionData[funcObj.functionName] = {
        metrics: null,
        logs: null,
      }
    })
    setFunctionData(functionData);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Get requested function metric data from aws lambda
 * @async
 * @function getMetricData
 * @param {function} setFunctionData - setter function for functionData state
 * @param {array} functions - list of AWS Lambda functions to query for data
 * @param {array} metrics - list of AWS Lambda metrics to obtain for each function
 * @param {number} startTime - unix time from which to begin pulling metrics data
 * @param {number} endTime - unix time until which to pulling metrics data. Defaults to now, rounded down to nearest minute.
 */
export const getMetricData = async (currFunctionData, setFunctionData, setDataLoaded, functions, metrics, startTime, endTime) => {
  if (!endTime) endTime = Math.floor(Date.now() / (1000*60))*(1000*60);
  try {
    const data = await fetch('/api/aws/getMetricData', {
      method: 'POST',
      body: JSON.stringify({
        start: startTime,
        end: endTime,
        funcs: functions,
        metrics
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedData = await data.json();
    // console.log(parsedData)
    const newFunctionData = {
      ...currFunctionData
    };
    Object.keys(parsedData).forEach(funcName => {
      newFunctionData[funcName].metrics = {}
      parsedData[funcName].metrics.forEach(metric => { // {Throttles: {}}
        const metricName = Object.keys(metric)[0]
        newFunctionData[funcName].metrics[metricName] = {
          timestamps: metric[metricName].timestamps,
          values: metric[metricName].vals,
        }
      });
    });
    setFunctionData(newFunctionData);
    setDataLoaded(true);
  } catch (err) {
    console.log(err);
  }
}

export const getLogs = async (currFunctionData, setFunctionData, setDataLoaded, func, startTime, endTime) => {
  if (!endTime) endTime = Math.floor(Date.now() / (1000*60))*(1000*60);
  try {
    const logs = await fetch('/api/aws/getLogsData', {
      method: 'POST',
      body: JSON.stringify({
        start: startTime,
        end: endTime,
        func,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const parsedLogs = await logs.json();
    console.log(parsedLogs);
    const newFunctionData = {
      ...currFunctionData
    }
    newFunctionData[func].logs = parsedLogs;
    setFunctionData(newFunctionData);
    setDataLoaded(true);
  } catch (err) {
    console.log(err);
  }
}
