import React, {useEffect, useState} from 'react';
import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Checkbox, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const LogSelectionContainer = (props) => {
  const [funcName, setFuncName] = useState([]);
  const handleFuncChange = (event) => {
    const {
      target: { value },
    } = event;
    setFuncName(
      typeof value === 'string' ? value.split(',') : value,
    );
  }
  return (
    <div>
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
      <FormControl>
        <Button variant="contained" color= 'secondary' >Go</Button>
      </FormControl>
      </div>
  )
}

export default LogSelectionContainer;