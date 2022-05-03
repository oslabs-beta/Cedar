import React, {useState, useCallback} from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

const Logs = () => {
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('/home', {replace: true}), [navigate]);
  return(
    <Button variant="contained" color= 'secondary' onClick= {handleBackClick} >Return Home</Button>
  )
}

export default Logs;