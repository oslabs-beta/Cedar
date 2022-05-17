import React, {useCallback, useState} from 'react';
import { TextField, Grid, Paper, Button, AppBar, } from '@mui/material';

const Login = (props) => {

  const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75}
  return (
    <div className= 'lobbyPage'>
      <Grid>
        <Paper align= 'left' elevation= {10} style= {paperStyle}>
          <Grid align= 'center'>
            <h3>Log In</h3>
          </Grid>
          <TextField label='Username' placeholder='Enter username' fullwidth='true' 
            label="Username"
            id="enterUsername"
            value={props.username}
            onChange={props.handleUsernameChange}
          />
          <h4></h4>
          <TextField label='Password' placeholder='Enter password' fullwidth='true' 
          label="Password"
          id="enterPassword"
          value={props.password}
          onChange={props.handlePasswordChange}
          />
          <h4></h4>
          <Button variant="contained" align= 'center' color= 'secondary' onClick={props.handleOnLoginClick}>Log In</Button>
          <h5>Don't have an account?</h5>
          <Button variant="outlined" color= 'secondary' onClick={props.handleGoToSignupClick}>Sign Up</Button>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login;