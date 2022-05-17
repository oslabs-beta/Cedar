import React, {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Button, SvgIcon } from '@mui/material';
import { AppBar, Toolbar, Typography, Box, FormControl} from '@mui/material';
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
  const handleLogout = useCallback(() => navigate('/', {replace: true}), [navigate]);
  
  const HomeIcon = (props) => {
    return (
      <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    )
  }
  
  return(
    <div>
    {/* <Button variant="contained" color= 'secondary' onClick= {handleBackClick} >Return Home</Button> */}
    <Box m={1} sx={{ flexGrow: 1 }} >
        <AppBar position="static" >
          <Toolbar>
          <HomeIcon style={{ marginRight: 16 }} color="secondary" fontSize="large" onClick= {handleBackClick}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGS
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {funcsLoaded && <LogSelectionContainer funcNames={functionNames} funcData={props.funcData} setFunctionData={props.setFunctionData} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded} creds={props.creds}/>}
    {/* {funcsLoaded && <LogSelectionContainer position= 'static' funcNames={functionNames} funcData={props.funcData} setFunctionData={props.setFunctionData} dataLoaded={dataLoaded} setDataLoaded={setDataLoaded}/>} */}
    </div>
  )
}

export default LogsPage;