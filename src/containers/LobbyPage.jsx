import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';
import Signup from './Signup';

const LobbyPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75}
  const [ signUp, setSignup ] = useState(false);
  const navigate = useNavigate();


  const handleOnLoginClick = useCallback(() => {
    //props.loggedIn = true;
    props.setLogin(true);
    navigate('/metrics', {replace: true}), [navigate]
  });
  //add functionality, if props.loggedIn = true, navigate
  //const handleOnSignupClick = useCallback(() => navigate('/', {replace: true}), [navigate]);
  const handleSignupClick = () => {
    setSignup(true)
  }
  if(signUp === true){
    return <Signup />
  }

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
          <Button variant="contained" align= 'center' color= 'secondary' onClick={handleOnLoginClick}>Log In</Button>
          <h5>Don't Have an account?</h5>
          <Button variant="outlined" color= 'secondary' onClick={handleSignupClick}>Sign Up</Button>
        </Paper>
      </Grid>
    </div>
  )
};

//adding functionality: login on submit-- on click 



export default LobbyPage;