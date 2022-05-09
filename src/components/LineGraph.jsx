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

// props: metric: str, funcs: {name:{timestamps, vals}, {}}, period
// props: x & y mins and max
// processing: given a period, determine:
  // x axis scale and new timestamps for that period - DONE
  // y axis vals for each function in each new timestamp - DONE
  // outputs - new labels array, array of functions, each an obj with name, values, maybe some other stuff
function  LineGraph (props) {
  const { timestamps, unitName, timeMin, metricName, functions } = props.dataProp;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        text: metricName
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: unitName,
        },
        min: timeMin,
      },
      y: {
        min: 0,
      }
    },
    cubicInterpolationMode: 'monotone',
  };
   
  return (
    <div className= 'lineChartContainer'>
      <Line className='testChart'
        options={options}
        data={{
          labels: timestamps,
          datasets: functions,
        }}
      />
    </div>
  )
};

export default LineGraph;
