import React, {useState} from 'react';
import { TextField, Grid, Paper, Button, AppBar, SvgIcon } from '@mui/material';
import Lobby from './LobbyPage';
import Home from './MetricsPage';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Signup = () => {
  const [ create, setCreate ] = useState(false);
  const [ cancel, setCancel ] = useState(false);

  const handleCreateChange = () => {
    setCreate(true);
  }

  const handleCancelChange = () => {
    setCancel(true);
  }

  const handleStackLink = () => {
    //this needs to navigate user to create their stack with Cedar, where they will get arn and region to input
  }
  const handleHelpClick = () => {

  }
  const paperStyle = {padding: 30, height: '45vh auto', width:500, margin: '10px auto', opacity: 0.75};
  if(create === true){
    return <Home />
  }
  if(cancel === true){
    return <Lobby />
  }
  return(
    <div className='signup'>
    <Grid>
      <Paper align= 'left' elevation= {10} style= {paperStyle}>
        <Grid align= 'center'>
          <h3>Sign Up</h3>
        </Grid>
        <TextField label='Username' placeholder='Enter username' fullwidth="true" />
        <h4></h4>
        <TextField label='Password' placeholder='Enter password' fullwidth="true" />
        <h4></h4>
        <Button variant="outlined" color= 'secondary' onClick= {handleStackLink} >Generate AWS Stack with Cedar</Button>
        <SvgIcon component={HelpOutlineIcon} color='secondary' onClick={handleHelpClick}/>
        <h4></h4>
        <TextField label='ARN' placeholder='Enter ARN' fullwidth="true" />
        <h4></h4>
        <TextField label='Region' placeholder='Enter region' fullwidth="true" />
        <h4></h4>
        <Button variant="contained" color= 'secondary' onClick= {handleCreateChange} >Create Account</Button>
        <Button variant="text"  color= 'secondary' onClick= {handleCancelChange}>Cancel</Button>
      </Paper>
    </Grid>
    </div>
  )
  //function to handle the submit click, it will be an addUser post request to server probably passed from lobby


}

export default Signup;