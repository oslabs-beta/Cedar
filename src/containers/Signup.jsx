import React, {useState} from 'react';
import { TextField, Grid, Paper, Button, AppBar, SvgIcon } from '@mui/material';
import Lobby from './LobbyPage';
import Home from './MetricsPage';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Signup = (props) => {
  const [ create, setCreate ] = useState(false);
  const [ cancel, setCancel ] = useState(false);

  const handleSignupClick = () => {
    props.setSignup(true)
  }

  const handleCreateChange = () => {
    handleSignupClick()
    setCreate(true)
  }

  const handleCancelChange = () => {
    props.setGoSignup(false);
    setCancel(true);
  }

  // const handleStackLink = () => {
  //   //this needs to navigate user to create their stack with Cedar, where they will get arn and region to input
  // }
  const handleHelpClick = () => {

  }
  const paperStyle = {padding: 30, height: '45vh auto', width:500, margin: '10px auto', opacity: 0.75};
  if(create === true){
    return <Lobby />
  }
  if(cancel === true){
    return <Lobby />
  }
  //link so if no arn, navigate to link, link to quickCreateStack, connects their AWS to our AWS with brief directions to 
  //no stack, no app
  //need input field for arn and region
  return(
    <div className='signup'>
    <Grid>
      <Paper align= 'left' elevation= {10} style= {paperStyle}>
        <Grid align= 'center'>
          <h3>Sign Up</h3>
        </Grid>
        <TextField label='Username' placeholder='Create Username' fullwidth="true"
          id="createUser"
          value={props.user}
          onChange={props.handleUserCreate}
        />
        <h4></h4>
        <TextField label='Password' placeholder='Create Password' fullwidth="true"
        type="password"
        autoComplete="current-password"
        id="createPass"
        value={props.pass}
        onChange={props.handlePassCreate}
        />
        <h4></h4>
        <Button variant="outlined" color= 'secondary' target='_blank' href='https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateUrl=https%3A%2F%2Fs3-external-1.amazonaws.com%2Fcf-templates-1gfd64rrlgteb-us-east-1%2F2022133FjG-Cedar-CouldFormation.yml&stackName=Cedar-Stack'>Generate AWS Stack with Cedar</Button>
        <SvgIcon component={HelpOutlineIcon} color='secondary' onClick={handleHelpClick}/>
        <h4></h4>
        <TextField label='ARN' placeholder='Enter ARN' fullwidth="true" 
        id="createArn"
        value={props.arn}
        onChange={props.handleArnCreate}
        />
        <h4></h4>
        <TextField label='Region' placeholder='Enter region' fullwidth="true" 
        id="createRegion"
        value={props.region}
        onChange={props.handleRegionCreate}
        />
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