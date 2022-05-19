import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LobbyPage from './containers/LobbyPage';
import MetricsPage from './containers/MetricsPage';
import LogsPage from './containers/LogsPage';
import { themeLight, themeDark} from './utils/userUtils'
import {
  Routes,
  Route,
} from "react-router-dom";
import { getFuncs} from "./utils/fetchUtils";
import { postSignup } from './utils/userUtils';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [user, setUser] = useState('');
  const handleUserCreate = (event) => {
    const {
      target: {value},
    } = event;
    setUser(value)
  }
  const [pass, setPass] = useState('');
  const handlePassCreate = (event) => {
    const {
      target: {value},
    } = event;
    setPass(value)
  }
  const [username, setUsername] = useState('');
  const handleUsernameChange = (event) => {
    const {
      target: {value},
    } = event;
    setUsername(value)
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (event) => {
    const {
      target: {value},
    } = event;
    setPassword(value)
  }

  const [arn, setArn] = useState('');
  const handleArnCreate = (event) => {
    const {
      target: {value},
    } = event;
    setArn(value)
  }

  const [region, setRegion] = useState('');
  const handleRegionCreate = (event) => {
    const {
      target: {value},
    } = event;
    setRegion(value)
  }
  const [creds, setCreds] = useState({});
  const [EXTERNAL_ID, setExternalId] = useState(uuidv4());

  //the creds object will look like : 
  /**
   * creds: 
   *   {region: region,
   *    credential: {
   *    accessKeyId: 2394209,
   *    secretAccessKey: 2350929
   *    }       
   *  }
   */
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  // const [verified, setVerified] = useState(false);
  const [goSignup, setGoSignup] = useState(false);
  // const [theme, setTheme] = useState(themeLight);

  const [functionData, setFunctionData] = useState({});
  // 
  //const [logData, setLogData] = useState([]);
  useEffect(() => {
    setExternalId(uuidv4())
  }, []);

  useEffect(() => {
    //setLogin(false);
    const sessionLogin = JSON.parse(window.sessionStorage.getItem('LOGIN'));
    if (sessionLogin !== null) setLogin(sessionLogin);

    const sessionFunctionData = JSON.parse(window.sessionStorage.getItem('FUNCTION_DATA'));
    if (sessionFunctionData !== null) setFunctionData(sessionFunctionData);
  }, [])

  useEffect(() => {
    window.sessionStorage.setItem('LOGIN', JSON.stringify(login));
    if(login){
      if (Object.keys(functionData).length === 0) {
        getFuncs(setFunctionData, setCreds, username, password);
      }
  }}, [login]);

  useEffect(() => {
    window.sessionStorage.setItem('FUNCTION_DATA', JSON.stringify(functionData));
  }, [functionData]);

  useEffect(() => {
    if(signup){
      postSignup(user, pass, arn, region, EXTERNAL_ID)
    }}, [signup]);

/**
 * func: {
 *   metrics: {invocations: {}, duration: {}, }
 *   logs:
 * }
 */



  return (
    <>
      <ThemeProvider theme={ themeDark }>
        <CssBaseline />
        <Routes>
          <Route path="/" 
          element=
          {<LobbyPage 
          loggedIn={login} 
          setLogin={setLogin} 
          signup={signup} 
          setSignup={setSignup} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          handleUsernameChange={handleUsernameChange} 
          handlePasswordChange={handlePasswordChange} 
          user={user} 
          setUser={setUser} 
          pass={pass} 
          setPass={setPass} 
          handleUserCreate={handleUserCreate} 
          handlePassCreate={handlePassCreate} 
          arn={arn} 
          region={region} 
          setArn={setArn} 
          setRegion={setRegion} 
          handleArnCreate={handleArnCreate} 
          handleRegionCreate={handleRegionCreate} 
          goSignup={goSignup} 
          setGoSignup={setGoSignup}
          EXTERNAL_ID={EXTERNAL_ID}
          // verified={verified}
          // setVerified={setVerified}
          />} 
          />
          <Route path="/metrics" 
          element=
          {<MetricsPage 
          funcData={functionData} 
          setFunctionData={setFunctionData} 
          creds={creds} 
          setCreds={setCreds}
          // username={username}
          // setUsername={setUsername}
          setLogin={setLogin}
          />} 
          />
          <Route path="/logs" 
          element=
          {<LogsPage 
          funcData={functionData} 
          setFunctionData={setFunctionData} 
          creds={creds} 
          setCreds={setCreds}
          // username={username}
          // setUsername={setUsername}
          setLogin={setLogin}
          />} 
          />
        </Routes>
      </ThemeProvider>
    </>
    )
  }
  
  
export default App;
