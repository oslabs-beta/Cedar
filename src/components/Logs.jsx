import React, {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { getLogs } from '../utils/fetchUtils';
import LogSelectionContainer from '../containers/LogSelectionContainer';

const Logs = (props) => {
  //this allows for navigation back to home route when the 'back' button is clicked
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('/home', {replace: true}), [navigate]);
  
  const [funcsLoaded, setFuncsLoaded] = useState(props.funcData.length > 0);
  useEffect(() => {
    setFuncsLoaded(props.funcData.length > 0);
  }, [props.funcData]);

  const [functionNames, setFunctionNames] = useState([]);
  useEffect(() => {
    if (funcsLoaded) setFunctionNames(props.funcData.map(func => func.functionName));
  }, [funcsLoaded]);

  useEffect(() => {
    console.log('getting the logs now');
    const startTime = Math.floor(Date.now() - (1000*60*60*24*7));
    const func = 'myloop';
    getLogs(() => {return}, func, startTime);
  })


  return(
    <div>
    <Button variant="contained" color= 'secondary' onClick= {handleBackClick} >Return Home</Button>
    {funcsLoaded && <LogSelectionContainer funcNames={functionNames} />}
    </div>
  )
}

export default Logs;