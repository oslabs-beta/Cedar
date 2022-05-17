import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LobbyPage from './containers/LobbyPage';
import MetricsPage from './containers/MetricsPage';
import LogsPage from './containers/LogsPage';
import {
  Routes,
  Route,
} from "react-router-dom";
import { getFuncs, postSignup } from "./utils/fetchUtils";



// ***Considering stashing this in a separate file
const themeLight = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#200d83',
    },
    info: {
      main: '#2196f3',
    },
  }
});

const themeDark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#57bfd8',
    },
    secondary: {
      main: '#200d83',
    },
    info: {
      main: '#2196f3',
    },
  }
});

// old state [{}, {},  {}]
// new state = oldstate.map(
  // if function not being updated, return function
  // if it is being updated
  // updatedFunc = {
  //   ...oldFunc
  //   timestamps: new timestamps from DB + existing ones
  //   values: new values from DB + existing ones
  // }
//)
// find index of funcion in old state fnInd
// oldState[fnInd].metrics.Invocations.values = new + old values

const App = () => {
  
  // const [accessId, setAccessId]
  // const [secretKey, setSecretKey]
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
  const [goSignup, setGoSignup] = useState(false);
  const [theme, setTheme] = useState(themeLight);

  const [functionData, setFunctionData] = useState({});
  // 
  //const [logData, setLogData] = useState([]);
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
      postSignup(user, pass, arn, region)
    }}, [signup]);
  // useEffect(() => {
  //   console.log(functionData)
  // }, [functionData]);
  // useEffect(() => {
  //   if(functionData.length > 0) setFunctionNames(functionData.map(func => func.functionName));
  // }, [functionData]);

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
        {/* <AppBar>
          <h5>home</h5>
        </AppBar> */}
        {/* <Lobby /> */}
        <Routes>
          <Route path="/" element={<LobbyPage loggedIn={login} setLogin={setLogin} signup={signup} setSignup={setSignup} username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} user={user} setUser={setUser} pass={pass} setPass={setPass} handleUserCreate={handleUserCreate} handlePassCreate={handlePassCreate} arn={arn} region={region} setArn={setArn} setRegion={setRegion} handleArnCreate={handleArnCreate} handleRegionCreate={handleRegionCreate} goSignup={goSignup} setGoSignup={setGoSignup}/>} />
          <Route path="/metrics" element={<MetricsPage funcData={functionData} setFunctionData={setFunctionData} creds={creds} setCreds={setCreds}/>} />
          <Route path="/logs" element={<LogsPage funcData={functionData} setFunctionData={setFunctionData} creds={creds} setCreds={setCreds}/>} />
        </Routes>
      </ThemeProvider>
    </>
    )
  }
  
  
export default App;
