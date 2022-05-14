import React, {useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';

const FilterSelection = (props) => {

  const typeStart = [];
  const typeEnd = [];
  const typeReport = [];
  const typeError = [];
  for(let i=0; i<props.rows.length; i++){
    // console.log('string:', props.rows[i].type, props.rows[i].type.length)
    if(props.rows[i].type==='START'){
      typeStart.push(props.rows[i])
    } else if (props.rows[i].type=== 'END'){
      typeEnd.push(props.rows[i])
    } else if (props.rows[i].type=== 'REPORT'){
      typeReport.push(props.rows[i])
    } else {
      typeError.push(props.rows[i])
    }
  }
  let array= [];
  if(props.type === 'start'){
    array= typeStart;
  } else if(props.type === 'end'){
    array= typeEnd;
  } else if(props.type === 'report'){
    array= typeReport;
  } else if(props.type === 'error'){
    array= typeError;
  }

  // const createTableByInvocation = (invocationTime, start, end, report, error) => {
  //   return { invocationTime, start, end, report, error }
  // }
  // const rowsByInvocation = [];
  //this needs to be an array of objects, each with properties invocationTime, start, end, report, error

  return (
    <div>
      { props.type!== '' &&
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Log Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="left">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="left">{row.invokeDate}</TableCell>
              <TableCell align="left">{row.messageText}</TableCell>
            </TableRow>
          ))}           
        </TableBody>
      </Table>
    </TableContainer>
    }
    </div>
  )
}

export default FilterSelection;