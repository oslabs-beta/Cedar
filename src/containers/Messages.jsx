import React, {useState} from 'react';
// import LogsHeader from '../components/LogsHeader';
// import MessageRow from '../components/MessageRow';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { dateTime } from '../utils/conversions';
import FilterSelection from './FilterSelection';
import { readLog } from '../utils/logsUtils';


const Messages = (props) => {
  const createTable = (invokeDate, type, messageText) => {
    return { invokeDate, type, messageText }
  }
  const rows = [];
  props.logs.forEach(message => {
    let type = message.message.slice(0, message.message.indexOf(' '));
    if(type.includes('ERROR')){
      type = 'ERROR'
    }
    let messageText = message.message.slice(message.message.indexOf(' '));
    let invokeDate = dateTime(message.ingestionTime);
    rows.push(createTable(invokeDate, type, messageText))
  })
  //console.log(rows)

  const createTableByInvocation = (invocationTime, start, end, report, error) => {
    return { invocationTime, start, end, report, error }
  }
  
  const rowsByInvocation = [];
  const readLogsResult = readLog(props.logs);
  let cache = {}; //obj of objs
  for(let key in readLogsResult){
    for(let obj in readLogsResult[key]){
      rowsByInvocation.push(createTableByInvocation(obj.IngestionTime, obj.Start, obj.End, obj.Report, obj.Error ))
    }
  }
  console.log(rowsByInvocation);
  console.log(readLogsResult);
  //rows is an array of objects with 3 properties: invokeDate, type, messageText
  
  const [filter, setFilter] = useState('');
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }; // so filter at this point would be the type of log data to display (default is none)
  const [order, setOrder] = useState('');
  const handleOrderChange = (event) => {
    setOrder(event.target.value)
  }
  const [type, setType] = useState('');
  const handleTypeChange = (event) => {
    setType(event.target.value)
  }
  const [clicked, setClicked] = useState(false);
  const handleEnterClick = () => {
    setClicked(true)
  }

    return(
     <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filter}
            onChange={handleFilterChange}
            label="Filter"
          >
            <MenuItem value="">
              <em>Log Time</em>
            </MenuItem>
            <MenuItem value={'logType'}>Log Type</MenuItem>
            <MenuItem value={'functionInstance'}>Per Invocation</MenuItem>
          </Select>
        </FormControl>
        {/* this will conditionally render if the filter selection is 'log type' */}
        { filter === 'logType' && 
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Choose Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleTypeChange}
          label="Type"
        >
          <MenuItem value={'start'}>Start</MenuItem>
          <MenuItem value={'end'}>End</MenuItem>
          <MenuItem value={'report'}>Report</MenuItem>
          <MenuItem value={'error'}>Error</MenuItem>
          <MenuItem value={'viewAll'}>View All</MenuItem>
        </Select>
      </FormControl>
        }

      <Button variant="contained" sx={{ m: .25, minWidth: 40 }} onClick={handleEnterClick}>ENTER</Button>
        {/* this is the end of the drop down selections */}
        {/* this is the start of the table */}
      {!clicked ? 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Log Type</TableCell>
              <TableCell align="left">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.invokeDate}
                </TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.messageText}</TableCell>
              </TableRow>
            ))}           
          </TableBody>
        </Table>
      </TableContainer>
      : <FilterSelection rows={rows} type={type}/>    
    }
    </div> 
    )
  
}

export default Messages;