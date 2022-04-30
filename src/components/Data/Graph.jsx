import Chart from "react-apexcharts";
import React, {Component} from 'react';

class Graph extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartType: "bar",
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ],
        options2: {
          chart: {
            id: "basic-line"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        series2: [
          {
            name: "series-2",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ],
      
    }
  }
  render() {
    if(this.state.chartType === 'line'){
      return (<div className="app2">
      <div className="row2">
        <div className="mixed-chart2">
          <Chart
            options={this.state.options2}
            series={this.state.series2}
            type="line"
            width="500"
          />
        </div>
      </div>
    </div>)
    }
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;