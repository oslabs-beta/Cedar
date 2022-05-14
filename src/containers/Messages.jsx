import React, {useState} from 'react';
<<<<<<< HEAD
// import LogsHeader from '../components/LogsHeader';
// import MessageRow from '../components/MessageRow';
=======
>>>>>>> dev
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
  let reversed = [];
  for(let i=rows.length -1; i>=0; i--){
    reversed.push(rows[i])
  };
  //console.log(rows);

  const readLogsResult = readLog(props.logs);
  
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

  let orderArray = [];
  if(order === 'oldestFirst'){
    orderArray = rows;
  } else {
    orderArray = reversed;
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


         <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={order}
          onChange={handleOrderChange}
          label="Order"
        >
          <MenuItem value="">
            <em>Newest First</em>
          </MenuItem>
          <MenuItem value={'oldestFirst'}>Oldest First</MenuItem>
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
            {orderArray.map((row) => (
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
      : <FilterSelection rows={orderArray} type={type} reversed={reversed} readLogsResult={readLogsResult}/>    
    }
    </div> 
    )
  
}

export default Messages;