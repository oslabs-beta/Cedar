import React, {Component, useCallback, useState} from 'react';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';
import Signup from './Signup';

// class Lobby extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       signUp: false
//     }
//     this.goSignup = this.goSignup.bind(this)
//   }

//   goSignup() {
//     if(this.state.signUp === false) {
//       this.setState({signUp: true})
//     }
//   }

function Lobby(){
  // render() {
    const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75}
    // if(this.state.signUp){
    //   return <Signup />
    // }
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/home', {replace: true}), [navigate]);
   
    return (
      <div className= 'lobbyPage'>
      {/* <AppBar>
        <h1>CEDAR</h1>
        
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
          <Button variant="contained" align= 'center' color= 'secondary' onClick={handleOnClick}>Log In</Button>
          <h5>Don't Have an account?</h5>
          <Button variant="outlined" color= 'secondary' >Sign Up</Button>
        </Paper>
      </Grid>
      </div>
    )
  // }
};

//adding functionality: login on submit-- on click 



export default Lobby;