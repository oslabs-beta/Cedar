import React, {Component} from 'react';
import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';
import Lobby from './Lobby';
import Home from './Home';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: false,
      cancel: false
    }
    this.createAcct = this.createAcct.bind(this)
    this.cancelSignup = this.cancelSignup.bind(this)
  }

  createAcct(){
    if(this.state.create === false){
      this.setState({create: true})
    }
  }

  cancelSignup(){
    if(this.state.cancel === false){
      this.setState({cancel: true})
    }
  }
  render(){
    const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75}
    if(this.state.create === true) {
      return <Home />
    }
    if(this.state.cancel === true) {
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
          <Button variant="contained" color= 'secondary' onClick= {this.createAcct} >Create Account</Button>
          <Button variant="text"  color= 'secondary' onClick= {this.cancelSignup}>Cancel</Button>
        </Paper>
      </Grid>
      </>
    )
  }
}

export default Signup;