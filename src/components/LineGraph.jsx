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
import { withTheme } from '@emotion/react';
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
    color: 'white',
    plugins: {
      title: {
        display: true,
        text: title,
        align: 'center',
        font: {
          size: 32
        },
        color: 'white',
      },
      legend: {
        position: 'bottom',
        title: {
          display: true,
          text: 'AWS Lambda Functions',
          font: {
            size: 16,
          },
        },
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Time',
          color: 'white',
          font: {
            size: 20,
          },
        },
        time: {
          unit: xUnit,
        },
        min: xMin,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'white',
          borderColor: 'white',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Metrics',
          color: 'white',
          font: {
            size: 20,
          },
        },
        min: yMin,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'white',
          borderColor: 'white',
        },
      },
    },
    elements: {
      point: {
        radius: 4,
      },
      line: {
        borderWidth: 2,
        borderDash: [4,1],
        cubicInterpolationMode: 'monotone',
      },
    },
  };
   
  return (
    <div className= 'lineGraphContainer'>
      <Line className='lineGraph'
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
