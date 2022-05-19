import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
// import { TextField, Grid, Paper, Button, AppBar } from '@mui/material';
import Signup from './Signup';
import Login from './Login';
// import { StoreMallDirectoryRounded } from '@mui/icons-material';

const LobbyPage = (props) => {
  // const [retry, setRetry] = useState(false)
  // const [ signUp, setSignup ] = useState(false);
  const navigate = useNavigate();
 
  const handleOnLoginClick = useCallback(() => {
    // if(props.verified){
      props.setLogin(true);
      navigate('/metrics', {replace: true}), [navigate]
    
    // else {
    //   setRetry(true)
    // }
  });

  const handleGoToSignupClick = () => {
    props.setGoSignup(true)
  }

  if(props.goSignup){
    return <Signup 
    user={props.user} 
    pass={props.pass} 
    setUser={props.setUser} 
    setPass={props.setPass} 
    handleUserCreate={props.handleUserCreate} 
    handlePassCreate={props.handlePassCreate} 
    arn={props.arn} 
    region={props.region} 
    setArn={props.setArn} 
    setRegion={props.setRegion} 
    handleArnCreate={props.handleArnCreate} 
    handleRegionCreate={props.handleRegionCreate} 
    signup={props.signup} setSignup={props.setSignup} 
    setGoSignup={props.setGoSignup}
    />
  }
    return (
    <Login 
    handleOnLoginClick={handleOnLoginClick} 
    handleUsernameChange={props.handleUsernameChange} 
    handlePasswordChange={props.handlePasswordChange} 
    username={props.username} 
    password={props.password} 
    handleGoToSignupClick={handleGoToSignupClick}
    // retry={retry}
    />
    )
};


export default LobbyPage;