import React, {useState} from 'react';
import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';
import Lobby from './Lobby';
import Home from './Home';

const Signup = () => {
  const [ create, setCreate ] = useState(false);
  const [ cancel, setCancel ] = useState(false);

  const handleCreateChange = () => {
    setCreate(true);
  }

  const handleCancelChange = () => {
    setCancel(true);
  }
  const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75};
  if(create === true){
    return <Home />
  }
  if(cancel === true){
    return <Lobby />
  }
  return(
    <>
    <Grid>
      <Paper align= 'left' elevation= {10} style= {paperStyle}>
        <Grid align= 'center'>
          <h3>Sign Up</h3>
        </Grid>
        <TextField label='Email' placeholder='Enter email' fullwidth="true" />
        <h4></h4>
        <TextField label='Password' placeholder='Enter password' fullwidth="true" />
        <h4></h4>
        <Button variant="contained" color= 'secondary' onClick= {handleCreateChange} >Create Account</Button>
        <Button variant="text"  color= 'secondary' onClick= {handleCancelChange}>Cancel</Button>
      </Paper>
    </Grid>
    </>
  )
  //function to handle the submit click, it will be an addUser post request to server probably passed from lobby


}

export default Signup;