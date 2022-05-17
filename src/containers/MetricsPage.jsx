import React, {useCallback, useEffect, useState} from 'react';
import { Box, Button, FormControl } from '@mui/material';
import { useNavigate } from 'react-router';
import DataSelectionContainer from './DataSelectionContainer';
import LineGraphContainer from './LineGraphContainer';

/**
 * MetricPage component. 
 * Renders view upon user log in and authentication. 
 * Will render the DataSelectionContainer component once the app fetches the user's AWS Lambda functions, allowing the user to choose functions, metrics, and period for which to request metric data. 
 * Will render line graphs for each of the requested metrics once the user has submitted the request and the data has been received from AWS. 
 */
const MetricsPage = (props) => {
  useEffect(() => { document.body.style.backgroundColor = 'white' }, [])

  // state used to determine if function data has been received from AWS.
  // if it has been received, user will be able to select functions, metrics, and period to query for metric data. 
  const [funcsLoaded, setFuncsLoaded] = useState(Object.keys(props.funcData).length > 0);
  useEffect(() => {
    setFuncsLoaded(Object.keys(props.funcData).length > 0);
  }, [props.funcData]);

  // names of the user's AWS functions, as delivered by AWS
  const [functionNames, setFunctionNames] = useState([]);
  useEffect(() => {
    if (funcsLoaded) setFunctionNames(Object.keys(props.funcData));
  }, [funcsLoaded]);

  // state used to determine if function metric data has been received from AWS.
  // if it has been received, app will display line graphs for the requested metrics.
  const [dataLoaded, setDataLoaded] = useState(false);

  // props used to create and render a line graph for each requested metric
  const [displayProps, setDisplayProps] = useState({
    functions: null,
    metrics: null,
    period: null,
    startTime: null
  });

  useEffect(() => {
    const sessionDisplayProps = JSON.parse(window.sessionStorage.getItem('DISPLAY_PROPS'));
    if (sessionDisplayProps !== null) setDisplayProps(sessionDisplayProps);

    const sessionDataLoaded = JSON.parse(window.sessionStorage.getItem('DATA_LOADED'));
    if (sessionDataLoaded !== null) setDataLoaded(sessionDataLoaded);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('DATA_LOADED', JSON.stringify(dataLoaded));
  }, [dataLoaded])
  
  useEffect(() => {
    window.sessionStorage.setItem('DISPLAY_PROPS', JSON.stringify(displayProps));
  }, [displayProps])
  
  const navigate = useNavigate();
  const handleLogClick = useCallback(() => navigate('/logs', {replace: true}), [navigate]);
  
  return(
    <div className= "homePage">
      <FormControl >
        <Button sx={{ m: 1, width: 200 }} variant="contained" color= 'secondary' onClick= {handleLogClick} >Go to Logs</Button>
        {funcsLoaded && <DataSelectionContainer 
          funcNames={functionNames}
          funcData={props.funcData}
          setFunctionData={props.setFunctionData}
          setDataLoaded = {setDataLoaded}
          setDisplayProps = {setDisplayProps}
          creds={props.creds}
          getCreds={props.getCreds}
        />}
      </FormControl>
      <Box>
      {dataLoaded && <LineGraphContainer displayProps={displayProps} funcData={props.funcData} />}
      </Box>
    </div>
  )
}

export default MetricsPage;
  