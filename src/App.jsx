import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Lobby from './components/Lobby';
//import { AppBar } from '@mui/material';
import Signup from './components/Signup';
import Home from './components/Home';
import Logs from './components/Logs';
import {
  Routes,
  Route,
} from "react-router-dom";
import { getFuncs } from "./utils/fetchUtils";


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

/** TODO
 * App + Login: set login state to true upon user logging in
 * * Today's MVP: state is set to true immediately upon pushing the button
 * * Logging in takes user to /home (done)
 * * getting function names (getFuncs) should depend on login state and should only fire when login is true
 * ChooseMetrics: once function names are received user sees the ChooseMetrics container + components
 * * TODO here: display to user some sort of 'loading' icon while getting function names
 * * Once function names are received display 3 picklists: Functions (multiselect), Metrics (multiselect), Period single select
 * * Hold users selections in local container state
 * * Once user submits selection, send API fetch request to get the requested data
 * utils: getMetricsData fetch request that
 * * gets the data
 * * properly updates app state without mutating
 * DisplayMetrics: once metric data is received, user should see the requested data graphed
 * * TODO here: display to user some sort of 'loading' icon while getting metric data, or maybe an empty graph, or perhaps something else
 * * User chooses graph to see, and it gets displayed
 * * Open question: what does user see first? Do they choose the first graph to see on the ChooseMetrics container? On the current page? Is there some sort of app default value?
 * * Open question: how hard is it to get different info onto the same graph?
 * * Perhaps: shows a graph for every metric received, with all functions plotted
 * * Perhaps: user can choose which functions they want to see on any one graph
 * DisplayLogs:
 * User can navigate to a log-devoted container
 * That container allows user to choose which function they want to retreive logs for
 * Once that data is obtained, we display to user in some sort of pleasing format
 * * Open Question: What is the user journey? How to they request a log? Do they go to a devoted log page? Can they choose a function to get logs?
 * utils: getLogData fetch request that
 * * gets the data
 * * properly updates app state without mutating
 */
const App = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState(false);
  const [theme, setTheme] = useState(themeLight);

  const [functionData, setFunctionData] = useState([]);

  useEffect(() => {
    if(login){
      getFuncs(setFunctionData);
  }}, [login]);

  // useEffect(() => {
  //   if(functionData.length > 0) setFunctionNames(functionData.map(func => func.functionName));
  // }, [functionData]);
 



  return (
    <>
      <ThemeProvider theme={ themeLight }>
        <CssBaseline />
        {/* <AppBar>
          <h5>home</h5>
        </AppBar> */}
        {/* <Lobby /> */}
        <Routes>
          <Route path="/" element={<Lobby loggedIn={login} setLogin={setLogin}/>} />
          <Route path="/home" element={<Home funcData={functionData} />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </ThemeProvider>
    </>
    //  <CircularProgress/>
    )
  }
  
  
export default App;
  

  // class App extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       email: '',
  //       password: '',
  //       firstName: '',
  //       lastName: '',
  //       isLoggedIn: false,
  //       // theme: themeLight
  //     };
  //     // this.signupSubmit = this.signupSubmit.bind(this);
  //     // this.loginSubmit = this.loginSubmit.bind(this);
  //     // this.checkSession = this.checkSession.bind(this);
  //     // this.logoutSubmit = this.logoutSubmit.bind(this);
  //     // this.toggleMode = this.toggleMode.bind(this);
  //   }
  //   componentDidMount() {
//     this.checkSession();
//   }

//   // checkTheme() {
//   //   if(this.state.)
//   // }

// signupSubmit(e) {
//   e.preventDefault();
//   const { email, password, firstName, lastName } = this.state;
//   const body = { email, password, firstName, lastName,}

//   fetch('/users/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'Application/JSON',
//     },
//     body: JSON.stringify(body),
//   })
//   .then((res) => {
//     console.log('hit signup', res);
//     res.json();
//     this.setState({ isLoggedIn: true });
//   })
//   .catch((err) => {
//     console.log('/users/signup post error: ', err);
//     this.setState({ email: '', password: ''});
//   });
//   }

//   loginSubmit(e) {
//     e.preventDefault();
//     const { email, password } = this.state;
//     const body = {
//       email,
//       password,
//     };
//     fetch('/users/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'Application/JSON',
//       },
//       body: JSON.stringify(body),
//     })
//       .then((res) => {
//         res.json();
//         console.log('hit login POST', res);
//         if (res.status === 200) {
//           this.setState({ isLoggedIn: true });;
//         } else {
//           this.setState({ isLoggedIn: 'failed' });
//         }
//       })
//       .catch((err) => {
//         console.log('/users/login POST error:', err);
//         this.setState({ email: '', password: '' });
//       });
//   }

//   logoutSubmit(e) {
//     e.preventDefault();
//     const { email } = this.state;
//     const body = {
//       email,
//     };
//     fetch('/users/logout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'Application/JSON',
//       },
//       body: JSON.stringify(body),
//     })
//       .then((res) => {
//         res.json();
//         console.log('res in LOGOUT POST', res);
//         if (res.status === 200) {
//           this.setState({ email: '', password: '', isLoggedIn: false });
//         } else {
//           this.setState({ isLoggedIn: true });
//         }
//       })
//       .catch((err) => {
//         console.log('/users/logout POST error:', err);
//         // this.setState({email: '', password: ''})
//       });
//   }

//   checkSession() {
//     fetch('/users/sessions')
//       .then((res) => res.json())
//       .then((res) => {
//         console.log('res.email in checkSession', res.email);
//         // on successful status, update state email and pw
//         this.setState({ email: [res.email], isLoggedIn: true });
//       })
//       .catch((err) => {
//         console.log('/users/sessions GET error:', err);
//       });
//   }

//   toggleMode(e) {
//     e.preventDefault();
//     const { theme } = this.state;
//     if (theme === themeDark) {
//       this.setState({ theme: themeLight });
//     } else if (theme === themeLight) {
//       this.setState({ theme: themeDark });
//     }
//   }

//   render() {
  
//     return (
//       <>
//         {/* //   <h1>Welcome to Cedar!</h1> */}
//         <ThemeProvider theme={ themeLight }>
//           <CssBaseline />
//           {/* <AppBar>
//             <h5>home</h5>
//           </AppBar> */}
//           {/* <Lobby /> */}
//           <Routes>
//             <Route path="/" element={<Lobby />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/logs" element={<Logs />} />
//           </Routes>
//         </ThemeProvider>
//       </>
//       //  <CircularProgress/>
//     )
//   }
// }

//functionality: pass the login/signup functions down as props, comment in the functions and binding 
