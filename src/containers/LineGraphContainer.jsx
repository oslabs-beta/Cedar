import React from "react";
import { periods, roundingUtil } from '../utils/conversions';
import LineGraph from '../components/Data/LineGraph';

function LineGraphContainer(props) {
  const { functions, metrics, period, startTime } = props.displayProps;
  // determine the x axis time unit given the period
  const unitName = periods[period].unitName;
  const unitTime = periods[period].unitMs;
  // get first timestamp as the startTime, rounded based on the unit
  const firstTimeStamp = roundingUtil(startTime, periods[period].unitMs);
  // generate timestamps for label given the period
  const timestamps = [];
  for (let time = firstTimeStamp; time < Date.now(); time += unitTime) {
    timestamps.push(time);
  }
  const dataProps = [];
  metrics.forEach(metric => {
    const dataProp = {
      timestamps,
      unitName,
      timeMin: firstTimeStamp,
      metricName: metric,
      functions: [],
    }
    functions.forEach(func => {
      const dataset = {
        id: func,
        label: func,
      };
      const rawData = props.funcData[func].metrics[metric];
      // data for plot, aligned with timestamps for plot
      let rawDataPointer = rawData.timestamps.length - 1;
      const data = timestamps.map((timestamp, i) => {
        let dataSum = 0;
        while (
          Date.parse(rawData.timestamps[rawDataPointer]) >= timestamp &&
          i < timestamps.length &&
          Date.parse(rawData.timestamps[rawDataPointer]) < timestamps[i + 1] &&
          rawDataPointer >= 0
        ) {
          dataSum += rawData.values[rawDataPointer];
          rawDataPointer--;
        }
        return dataSum;
      });
      dataset.data = data;
      dataProp.functions.push(dataset);
    });
    dataProps.push(dataProp);
  });
  const LineGraphs = dataProps.map(dataProp => {
    return <LineGraph key={dataProp.metricName} dataProp={dataProp} />
  })
  console.log(LineGraphs)
  return (
    <>
      <h1>This Container Will Hold Line Graph</h1>
      {LineGraphs}
    </>
  )
  //todo
}

 export default LineGraphContainer;
