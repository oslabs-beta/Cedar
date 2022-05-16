import React, {useState} from 'react';
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Checkbox, Button } from '@mui/material';
import Select from '@mui/material/Select';
import { getMetricData } from '../utils/fetchUtils';
import { periods } from '../utils/conversions';

const METRICS = ['Invocations', 'Throttles', 'Errors', 'Duration'];
const PERIODNAMES = Object.keys(periods);

// Formatting for MUI dropdowns rendered in container
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

/**
 * DataSelectionContainer component
 * Renders 3 dropdown menus with which user can select functions, metrics, and duration to request from AWS Cloudwatch.
 * Upon submission, will begin process of requesting data from AWS, updating App state upon receipt, and rendering line graphs with received data. 
 */
const DataSelectionContainer = (props) => {

  /**
   * 3 pieces of state below (funcName, metricName, period) hold the user's Dropdown selections in an array. 
   */
  const [funcName, setFuncName] = useState([]);
  const handleFuncChange = (event) => {
    const {
      target: { value },
    } = event;
    setFuncName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [metricName, setMetricName] = useState([]);
  const handleMetricChange = (event) => {
    const {
      target: { value },
    } = event;
    setMetricName(typeof value === 'string' ? value.split(',') : value);
  };

  const [period, setPeriod] = useState('');
  const handlePeriodChange = (event) => {
    const {
      target: { value },
    } = event;
    setPeriod(typeof value === 'string' ? value.split(',') : value);
  };

  /**
   * Handler to be executed upon user submission of form data - 
   * Initiates fetch request for data to backend, and updates state info needed for graph display
   */
  const getMetrics = () => {
    // dataLoaded state in MetricsPage must be false before requesting new data
    // otherwise, the page will try to render a line graph before data is received
    props.setDataLoaded(false);
    const startTime = Math.floor(Date.now() - periods[period[0]].ms);
    getMetricData(props.funcData, props.setFunctionData, props.setDataLoaded, funcName, metricName, startTime);
    props.setDisplayProps({
      functions: funcName,
      metrics: metricName,
      period: period[0],
      startTime: startTime
    });
  };

  return (
    <div className= 'dataSelection'>
      <Box pt={3} pb={3}>
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

         {PERIODNAMES.map((period) => (
            <MenuItem key={period} value={period}>
              <ListItemText primary={period} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <Button variant="contained" color= 'secondary' onClick={getMetrics} >Go</Button>
      </FormControl>
      </Box>
    </div>
  )
}

export default DataSelectionContainer;
