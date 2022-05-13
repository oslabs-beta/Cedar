import React, {useCallback, useState} from 'react';
import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';

const Login = (props) => {

  const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75}
  return (
    <div className= 'lobbyPage'>
      {/* <AppBar>
          <h5>home</h5>
        </AppBar> */}
      <Grid>
        <Paper align= 'left' elevation= {10} style= {paperStyle}>
          <Grid align= 'center'>
            <h3>Log In</h3>
          </Grid>
          <TextField label='Email' placeholder='Enter email' fullwidth='true' />
          <h4></h4>
          <TextField label='Password' placeholder='Enter password' fullwidth='true' />
          <h4></h4>
          <Button variant="contained" align= 'center' color= 'secondary' onClick={props.handleOnLoginClick}>Log In</Button>
          <h5>Don't Have an account?</h5>
          <Button variant="outlined" color= 'secondary' onClick={props.handleSignupClick}>Sign Up</Button>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login;