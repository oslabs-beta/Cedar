import React, {useEffect, useState} from 'react';

const METRICS = ['Invocations', 'Throttles', 'Errors', 'Duration']
const PERIODS = {
  'One Hour': (1000*60*60),
  'Three Hours': (1000*60*60)*3,
  'Six Hours': (1000*60*60)*6,
  'One Day': ((1000*60*60)*24),
  'Three Days': ((1000*60*60)*24)*3,
  'One Week': ((1000*60*60)*24)*7,
  'Two Weeks': ((1000*60*60)*24)*14,
  '30 Days': ((1000*60*60)*24)*30,
  'Custom': null
}

const DataSelectionContainer = (props) => {
  return (
    <>
      <h1>Metric options will go here</h1>
    </>
  )
}

export default DataSelectionContainer;