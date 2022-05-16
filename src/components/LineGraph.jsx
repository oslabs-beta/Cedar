import React from 'react';
import 'chartjs-adapter-moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


/**
 * LineGraph component.
 * Renders a line graph displaying metric data for input functions over time. 
 * Uses the react-chartjs-2 library <Line /> implementation of the chart.js LineGraph chart. 
 */
function  LineGraph (props) {
  const { title, xUnit, xMin, yMin, labels, datasets } = props.dataProp;

  // set options for chart.js LineGraph components
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        text: title
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: xUnit,
        },
        min: xMin,
      },
      y: {
        min: yMin,
      }
    },
    cubicInterpolationMode: 'monotone',
  };
   
  return (
    <div className= 'lineChartContainer'>
      <Line className='testChart'
        options={options}
        data={{
          labels,
          datasets,
        }}
      />
    </div>
  )
};

export default LineGraph;
