import React, {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import LogSelectionContainer from './LogSelectionContainer';

const LogsPage = (props) => {
  //this allows for navigation back to home route when the 'back' button is clicked
  
  const [funcsLoaded, setFuncsLoaded] = useState(Object.keys(props.funcData).length > 0);
  useEffect(() => {
    setFuncsLoaded(Object.keys(props.funcData).length > 0);
  }, [props.funcData]);
  
  const [functionNames, setFunctionNames] = useState([]);
  useEffect(() => {
    if (funcsLoaded) setFunctionNames(Object.keys(props.funcData));
  }, [funcsLoaded]);

  const [dataLoaded, setDataLoaded] = useState(false);
  
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('/metrics', {replace: true}), [navigate]);

  return(
    <div>
    <Button variant="contained" color= 'secondary' onClick= {handleBackClick} >Return Home</Button>
    {funcsLoaded && <LogSelectionContainer funcNames={functionNames} funcData={props.funcData} setFunctionData={props.setFunctionData} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded}/>}
    </div>
  )
}

export default LogsPage;