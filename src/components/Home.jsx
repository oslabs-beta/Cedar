import React, {useCallback, useEffect, useState} from 'react';
import { Box, Button, AppBar, Divider } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Graph from './Data/Graph'
import { useNavigate } from 'react-router';
import DataSelectionContainer from '../containers/DataSelectionContainer';

const Home = (props) => {
  // const [ color, setColor ] = useState('#007bff')

  // 
  const [funcsLoaded, setFuncsLoaded] = useState(props.funcData.length > 0);
  useEffect(() => {
    setFuncsLoaded(props.funcData.length > 0);
  }, [props.funcData]);

  const [functionNames, setFunctionNames] = useState([]);
  useEffect(() => {
    if (funcsLoaded) setFunctionNames(props.funcData.map(func => func.functionName));
  }, [funcsLoaded]);

  const [dataLoaded, setDataLoaded] = useState(false);
  //TODO: Use effect to set dataLoaded to true upon getting metrics data
  
  const navigate = useNavigate();
  const handleLogClick = useCallback(() => navigate('/logs', {replace: true}), [navigate]);
  return(
    <div className= "homePage">
      {/* <AppBar>
        <h5>home</h5>
      </AppBar> */}
      <Button variant="contained" color= 'secondary' onClick= {handleLogClick} >Go to Logs</Button>
      {funcsLoaded && <DataSelectionContainer funcNames={functionNames} />}
      <Graph />
    </div>
  )
}

export default Home;