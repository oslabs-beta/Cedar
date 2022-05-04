import React, {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { getLogs } from '../utils/fetchUtils';

const Logs = () => {
  useEffect(() => {
    console.log('getting the logs now');
    const startTime = Math.floor(Date.now() - (1000*60*60*24*7));
    const func = 'myloop';
    getLogs(() => {return}, func, startTime);
  })

  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('/home', {replace: true}), [navigate]);
  return(
    <Button variant="contained" color= 'secondary' onClick= {handleBackClick} >Return Home</Button>
  )
}

export default Logs;