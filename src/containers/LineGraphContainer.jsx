import React from "react";
import { periods, roundingUtil } from '../utils/conversions';
import LineGraph from '../components/LineGraph';
import { generateTimestamps, prepGraphFromRawData } from "../utils/chartjsUtils";

const COLORS = ['green', 'purple', 'pink', 'orange', 'blue', 'red', 'yellow'];

/**
 * LineGraphContainer component.
 * Prepares AWS Lambda metric data in state for input into chart.js line graph components
 * Renders container that holds a chart.js line graph for every metric requests by the user. 
 */
function LineGraphContainer(props) {
  const { functions, metrics, period, startTime } = props.displayProps;
  // determine the x axis time unit given the period
  const unitName = periods[period].unitName;
  const unitTime = periods[period].unitMs;

  // get first timestamp as the startTime, rounded based on the unit
  const firstTimeStamp = roundingUtil(startTime, periods[period].unitMs);
  const endTimeStamp = roundingUtil(Date.now(), periods[period].unitMs);
  // generate timestamps for label given the period
  const timestamps = generateTimestamps(firstTimeStamp, endTimeStamp, unitTime);

  const dataProps = prepGraphFromRawData(props.funcData, metrics, functions, timestamps, firstTimeStamp, unitName);

  const LineGraphs = dataProps.map(dataProp => {
    return <LineGraph key={dataProp.title} dataProp={dataProp} />
  })
  return (
    <>
      {LineGraphs}
    </>
  )
  //todo
}

 export default LineGraphContainer;
