/**
 * Creates an array of unix timestamps from a start to and end time
 * spaced out by a supplied step time
 * @param {number} start - start time in unix epoch time (ms)
 * @param {number} end - end time in unix epoch time (ms)
 * @param {number} timestep - step size in ms
 * @returns {array} array of equally spaced times from start to end
 */
export const generateTimestamps = (start, end, timestep) => {
  const timestamps = [];
  for (let time = start; time < end; time +=timestep) {
    timestamps.push(time);
  }
  return timestamps;
}

/**
 * Map a set of values corresponding to one set of timestamps to a different set of timestamps
 * @param {object} {timestamps, values} - an object containing timestamp and values properties, each an array of raw data values corresponding to raw data timestamps
 * @param {array} targetTimestamps - a new set of timestamps to which the raw data values should be mapped
 * @returns {array} the raw data values mapped into an array corresponding to the target timestamps array
 */
export const mapDatatoTimestamps = ({ timestamps, values }, targetTimestamps) => {
  let rawDataPointer = timestamps.length - 1;
  // use the target timestamps array to map the raw data array into a new array as follows -
  return targetTimestamps.map((targetTimestamp, i) => {
    // while the raw data timestamps are between the current and next target timestamp
    // reduce the raw data values into a single sum for that timestamp, to be mapped into the returned array
    let dataSum = 0;
    while (
      Date.parse(timestamps[rawDataPointer]) >= targetTimestamp &&
      i < targetTimestamps.length &&
      Date.parse(timestamps[rawDataPointer]) < targetTimestamps[i + 1] &&
      rawDataPointer >= 0
    ) {
      dataSum += values[rawDataPointer];
      rawDataPointer--;
    }
    return dataSum;
  })
}

/**
 * Shapes inputs to an object for use as a chart.js dataset
 * @param {string} funcName - name of function to be plot
 * @param {string} color - color to be used for the line graph
 * @param {array} data - array of y-axis values for the function's dataset
 * @returns {object} - an object that can be used in a chart.js datasets array
 */
export const createDataset = (funcName, color, data) => {
  return {
    id: funcName,
    label: funcName,
    backgroundColor: color,
    borderColor: color,
    data: data
  }
}

/**
 * Creates the props object to be passed to chart.js LineGraph components
 * Data within props will be used to populate the charts options, labels, and datasets
 * @param {string} title - Title of the plot
 * @param {string} xUnit - x-Axis unit
 * @param {number} xMin - minimum x-Axis value
 * @param {number} yMin - minimum x-Axis value
 * @param {array} labels - array of x-Axis values
 * @param {array} datasets - array of objects, each representing a 
 * @returns {object} 'props' object to be passed to a chart.js line graph component, whose values will be used to create a line graph.
 */
export const createLineGraphProps = (title, xUnit, xMin, yMin, labels, datasets) => {
  return { title, xUnit, xMin, yMin, labels, datasets }
}

/**
 * Colors to be used for each series in a single line graph
 */
const COLORS = ['green', 'purple', 'pink', 'orange', 'blue', 'red', 'yellow'];

/**
 * Creates the props needed to render a chart.js LineGraph in the app, given data
 * held in state and user selections. 
 * @param {object} rawData - Cache of AWS Lambda metric data stored in state
 * @param {array} metrics - Metrics selected by user to display as ine graphs
 * @param {array} functions - Functions selected by user to display in each line graph
 * @param {array} timestamps - x-axis values for the line graphs in Unix time (ms)
 * @param {array} firstTimeStamp - minimum x-axis value for line graphs in Unix time (ms
 * @param {string} unitName - x-axis timestep unit
 * @returns {array} An array of objects, each being the props to pass down to an individual line graph component
 */
export const prepGraphFromRawData = (rawData, metrics, functions, timestamps, firstTimeStamp, unitName) => {
  return metrics.map(metric => {
    return createLineGraphProps(
      metric,
      unitName,
      firstTimeStamp,
      0,
      timestamps,
      functions.map((func, i) => {
        return createDataset(
          func,
          COLORS[i],
          mapDatatoTimestamps(rawData[func].metrics[metric], timestamps)
        )
      }),
    );
  });
}
