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
    setFunctionData(parsedData.map(func => { 
      return {
      ...func,
      metrics: null,
      logs: null
        }
      })
    );
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
export const getMetricData = async (setFunctionData, functions, metrics, startTime, endTime) => {
  if (!endTime) endTime = Math.floor(Date.now() / (1000*60))*(1000*60);
  try {
    console.log('fetching data')
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
    console.log('got data');
    const parsedData = await data.json();
    console.log(parsedData);
  } catch (err) {
    console.log(err);
  }
}

export const getLogs = async (setFunctionData, func, startTime, endTime) => {
  if (!endTime) endTime = Math.floor(Date.now() / (1000*60))*(1000*60);
  try {
    console.log('fetching logs');
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
    console.log('got logs');
    const parsedLogs = await logs.json();
    console.log(parsedLogs);
  } catch (err) {
    console.log(err);
  }
}
