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

const periodAttributes = (ms, unitName, unitMs) => {
  return {
    ms,
    unitName,
    unitMs
  }
}

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

export const roundingUtil = (num, roundUnit) => {
  return (Math.floor(num / roundUnit)) * roundUnit;
}
