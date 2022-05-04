import React, {useEffect, useState} from 'react';
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Checkbox, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
const PERIODARR = [];
for(let period in PERIODS){
  PERIODARR.push(period)
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DataSelectionContainer = (props) => {

  const [funcName, setFuncName] = useState([]);
  const handleFuncChange = (event) => {
    const {
      target: { value },
    } = event;
    setFuncName(
      typeof value === 'string' ? value.split(',') : value,
    );
    // setFuncName(props.funcNames.indexOf(value) !== 0 ? value.split(' ,') : value);
  }
  const [metricName, setMetricName] = useState([]);
  const handleMetricChange = (event) => {
    const {
      target: { value },
    } = event;
    setMetricName(typeof value === 'string' ? value.split(',') : value);
  }
  const [period, setPeriod] = useState('');
  const handlePeriodChange = (event) => {
    const {
      target: { value },
    } = event;
    setPeriod(typeof value === 'string' ? value.split(',') : value);
  }
  return (
    // <>
    //   <h1>Metric options will go here</h1>
    // </>
    <div className= 'dataSelection'>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Function(s)</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={funcName}
          onChange={handleFuncChange}
          input={<OutlinedInput label="Function(s)" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.funcNames.map((func) => (
            <MenuItem key={func} value={func}>
              <Checkbox checked={funcName.indexOf(func) > -1} />
              <ListItemText primary={func} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Metric(s)</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={metricName}
          onChange={handleMetricChange}
          input={<OutlinedInput label="Metric(s)" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {METRICS.map((metric) => (
            <MenuItem key={metric} value={metric}>
              <Checkbox checked={metricName.indexOf(metric) > -1} />
              <ListItemText primary={metric} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={period}
          label="Period"
          onChange={handlePeriodChange}
          MenuProps={MenuProps}
        >

         {PERIODARR.map((period) => (
            <MenuItem key={period} value={period}>
              <ListItemText primary={period} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <Button variant="contained" color= 'secondary' >Go</Button>
      </FormControl>
    </div>
  )
}

export default DataSelectionContainer;

{/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}

          {/* {PERIODS.map((period) => (
            <MenuItem key={period} value={period}>
              <ListItemText primary={period} />
            </MenuItem>
          ))} */}