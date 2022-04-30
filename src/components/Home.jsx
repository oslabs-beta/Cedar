import React, {Component} from 'react';
import { Box, Button, AppBar, Divider } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Graph from './Data/Graph'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#007bff"
    }
  }

  render(){
    return(
      <div className= "homePage">
  <Graph />
      </div>
    )
  }
}

export default Home;