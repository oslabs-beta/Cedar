import React, {useCallback, useEffect, useState} from 'react';
import { Box, Button, AppBar, Divider, FormControl } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Graph from './Data/Graph';
import LineGraph from './Data/LineGraph';
import { useNavigate } from 'react-router';
import DataSelectionContainer from '../containers/DataSelectionContainer';
import { getMetricData } from '../utils/fetchUtils';

const Home = (props) => {
  // const [ color, setColor ] = useState('#007bff')
  useEffect(() => { document.body.style.backgroundColor = 'white' }, [])
  // 
  const [funcsLoaded, setFuncsLoaded] = useState(props.funcData.length > 0);
  useEffect(() => {
    setFuncsLoaded(props.funcData.length > 0);
  }, [props.funcData]);

  const [functionNames, setFunctionNames] = useState([]);
  useEffect(() => {
    if (funcsLoaded) setFunctionNames(props.funcData.map(func => func.functionName));
  }, [funcsLoaded]);

  useEffect(() => {
    if (funcsLoaded) {
      console.log('firing function')
      const startTime = Math.floor(Date.now() - (1000*60*60*24*7));
      const metrics = ['Invocations', 'Throttles', 'Errors', 'Duration'];
      const functions = [
        "test-func-app-HelloWorldFunction-2DJ2VlqjVGLQ",
        "testloop",
        "logsdata",
        "dbUpdated",
        "mir-app-HelloWorldFunction-54OVb43xIQbl",
        "metricsdata",
        "iterateLoop",
        "myNums",
        "myloop",
        "sentEmail"
      ];
      getMetricData(() => {return}, functions, metrics, startTime);
    }
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
      <FormControl sx={{ m: 1, width: 200 }}>
      <Button variant="contained" color= 'secondary' onClick= {handleLogClick} >Go to Logs</Button>
      {funcsLoaded && <DataSelectionContainer funcNames={functionNames} />}
      </FormControl>
      <Box>
      {/* <FormControl> */}
      {/* <Graph /> */}
      <LineGraph />
      {/* </FormControl> */}
      </Box>
    </div>
  )
}

export default Home;