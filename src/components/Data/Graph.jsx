import Chart from "react-apexcharts";
import React, { useState } from 'react';

const Graph = () => {
  const [ chartType, setChartType ] = useState('bar');
  const [ options, setOptions ] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  });
  const [ series, setSeries ] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]);
  
  const [ options2, setOptions2 ] = useState({
    chart: {
      id: "basic-line"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  });

  const [ series2, setSeries2 ] = useState([
    {
      name: "series-2",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]);

  let chart;
  if (chartType === 'line') {
    chart = (
      <div className="app2">
        <div className="row2">
          <div className="mixed-chart2">
            <Chart
              options={options2}
              series={series2}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  } else {
    chart = (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    )
  }
  return chart;
}

export default Graph;



// old class component code
// class Graph extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
      // chartType: "bar",
      // options: {
      //   chart: {
      //     id: "basic-bar"
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      //   }
      // },
      // series: [
      //   {
      //     name: "series-1",
      //     data: [30, 40, 45, 50, 49, 60, 70, 91]
      //   }
      // ],
      // options2: {
      //   chart: {
      //     id: "basic-line"
      //   },
      //   xaxis: {
      //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      //   }
      // },
  //     series2: [
  //       {
  //         name: "series-2",
  //         data: [30, 40, 45, 50, 49, 60, 70, 91]
  //       }
  //     ],
      
  //   }
  // }

    // render() {
  //   if(this.state.chartType === 'line'){
  //     return (<div className="app2">
  //     <div className="row2">
  //       <div className="mixed-chart2">
  //         <Chart
  //           options={this.state.options2}
  //           series={this.state.series2}
  //           type="line"
  //           width="500"
  //         />
  //       </div>
  //     </div>
  //   </div>)
  //   }
  //   return (
  //     <div className="app">
  //       <div className="row">
  //         <div className="mixed-chart">
  //           <Chart
  //             options={this.state.options}
  //             series={this.state.series}
  //             type="bar"
  //             width="500"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }