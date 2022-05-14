/**
 * Mapping of time unit conversions
 */
export const timeConversions = {
  msPerSec: 1000,
  secPerMin: 60,
  minPerHr: 60,
  hrPerDay: 24,
  dayPerWeek: 7,
  msPerMin: 1000*60,
  msPerHr: 1000*60*60,
  msPerDay: 1000*60*60*24,
  msPerWeek: 1000*60*60*24*7,
};

/**
 * Create object with various associated with user selection options for time periods
 * @param {number} ms - milliseconds in the time period
 * @param {string} unitName - name of the time step unit to be used for the x-axis in Chart.js
 * @param {number} unitMs - milliseconds in the unitName timestep 
 * @returns An object with the function params as keys and the args as values
 */
const periodAttributes = (ms, unitName, unitMs) => {
  return {
    ms,
    unitName,
    unitMs
  }
}

/**
 * Object mapping user selection options for time periods to various attributes
 */
export const periods = {
  'One Hour': periodAttributes(timeConversions.msPerHr, 'minute', timeConversions.msPerMin),
  'Three Hours': periodAttributes(timeConversions.msPerHr*3, 'minute', timeConversions.msPerMin),
  'Six Hours': periodAttributes(timeConversions.msPerHr*6, 'minute', timeConversions.msPerMin),
  'One Day': periodAttributes(timeConversions.msPerDay, 'hour', timeConversions.msPerHr),
  'Three Days': periodAttributes(timeConversions.msPerDay*3, 'hour', timeConversions.msPerHr),
  'One Week': periodAttributes(timeConversions.msPerWeek, 'day', timeConversions.msPerDay),
  'Two Weeks': periodAttributes(timeConversions.msPerWeek*2, 'day', timeConversions.msPerDay),
  '30 Days':  periodAttributes(timeConversions.msPerDay*30, 'day', timeConversions.msPerDay),
  'Custom': null
};

/**
 * Rounding utility to round numbers down to a specified unit
 * @param {number} num - the number to be rounding
 * @param {number} roundUnit - the rounding unit
 * @returns 
 */
export const roundingUtil = (num, roundUnit) => {
  return (Math.floor(num / roundUnit)) * roundUnit;
}

export const dateTime = (timestamp) => {
  let date = new Date(timestamp);
  return date.toDateString();
}

//console.log(dateTime(1651779434756));