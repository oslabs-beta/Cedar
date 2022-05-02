import React, {useCallback, useState} from 'react';
import { Box, Button, AppBar, Divider } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Graph from './Data/Graph'
import { useNavigate } from 'react-router';

const Home = () => {
  // const [ color, setColor ] = useState('#007bff')
  
  const navigate = useNavigate();
  const handleLogClick = useCallback(() => navigate('/logs', {replace: true}), [navigate]);
  return(
    <div className= "homePage">
      {/* <AppBar>
        <h5>home</h5>
      </AppBar> */}
      <Button variant="contained" color= 'secondary' onClick= {handleLogClick} >Go to Logs</Button>
      <Graph />
    </div>
  )
}


// class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     color: "#007bff"
  //   }
  // }

  // render(){
  //   return(
  //     <div className= "homePage">
  // <Graph />
  //     </div>
  //   )
  // }


export default Home;