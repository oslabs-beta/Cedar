import React, {useState, useCallback} from 'react';
import { InputLabel, MenuItem, FormControl, ListItemText, Button, Box } from '@mui/material';
import Select from '@mui/material/Select';
import { getLogs } from '../utils/fetchUtils';
import { timeConversions as tc } from '../utils/conversions';
import { useNavigate } from 'react-router';
import Messages from './Messages';

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
const PERIODS = {
  'One Hour': tc.msPerHr,
  'Three Hours': tc.msPerHr*3,
  'Six Hours': tc.msPerHr*6,
  'One Day': tc.msPerDay,
  'Three Days': tc.msPerDay*3,
  'One Week': tc.msPerWeek,
  'Two Weeks': tc.msPerWeek*2,
  '30 Days': tc.msPerDay*30,
  'Custom': null
}
const PERIODARR = [];
for(let period in PERIODS){
  PERIODARR.push(period)
}

const LogSelectionContainer = (props) => {
  const [funcName, setFuncName] = useState('');
  const handleFuncChange = (event) => {
    const {
      target: { value },
    } = event;
    setFuncName(
      typeof value === 'string' ? value.split(',') : value,
    );
  }
  const [period, setPeriod] = useState('');
  const handlePeriodChange = (event) => {
    const {
      target: { value },
    } = event;
    setPeriod(typeof value === 'string' ? value.split(',') : value);
  }
  //const [clicked, setClicked] = useState(false);
  const [displayedFunc, setDisplayedFunc] = useState('');

  const getLogsNow = () => {
    props.setDataLoaded(false);
    const startTime = Math.floor(Date.now() - PERIODS[period[0]]);
    getLogs(props.funcData, props.setFunctionData, props.setDataLoaded, funcName, setDisplayedFunc, startTime, props.creds)
  }

  const navigate = useNavigate();
  const handleResetOptions = useCallback(() => navigate('/logs', {replace: true}), [navigate]);
  
  return (
    <div className='logSelection' >
      <Box pt={2} >
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">Function</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={funcName}
          label="Function"
          onChange={handleFuncChange}
          MenuProps={MenuProps}
        >
         {props.funcNames.map((func) => (
            <MenuItem key={func} value={func}>
              <ListItemText primary={func} />
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
      <FormControl >
        <Box p={1} pt={2}>
        <Button variant="contained" color= 'secondary' onClick= {getLogsNow}>Go</Button>
        </Box>
      </FormControl>
      {props.dataLoaded && <Messages logs={props.funcData[displayedFunc].logs}/>}
      </Box>
      </div>
  )
}

export default LogSelectionContainer;