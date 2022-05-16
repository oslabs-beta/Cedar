import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
// import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';
import Signup from './Signup';
import Login from './Login';

const LobbyPage = (props) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  
  // const paperStyle = {padding: 30, height: '45vh auto', width:300, margin: '10px auto', opacity: 0.75}
  const [ signUp, setSignup ] = useState(false);
  const navigate = useNavigate();


  const handleOnLoginClick = useCallback(() => {
    //props.loggedIn = true;
    props.setLogin(true);
    navigate('/metrics', {replace: true}), [navigate]
  });
  const handleSignupClick = () => {
    setSignup(true)
  }
  if(signUp === true){
    return <Signup />
  }
    return (
    <Login handleOnLoginClick={handleOnLoginClick} handleSignupClick={handleSignupClick}/>
    )
};


export default LobbyPage;