import React from 'react';
import { timeConversions as tc } from '../../utils/conversions';
// import moment from 'moment';
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

function LineChart() {
  // const timesRaw = [
  //   "2022-04-28T16:12:00.000Z",
  //   "2022-04-28T01:14:00.000Z",
  //   "2022-04-28T00:40:00.000Z",
  //   "2022-04-28T00:39:00.000Z",
  //   "2022-04-27T14:31:00.000Z",
  //   "2022-04-27T14:26:00.000Z"
  // ]
  // const times = timesRaw.map(time => {
  //   return Date.parse(time)
  // });
  // const values = [10, 2, 3, 1, 1, 6];
  const metric = 'Invocations';
  const timeStamps = [];
  const funcOne = {
    name: 'funcOne',
    values: []
  };
  const funcTwo = {
    name: 'funcTwo',
    values: []
  };
  const funcThree = {
    name: 'funcThree',
    values: []
  };
  const now = Date.now();
  const yesterday = now - (tc.msPerSec * tc.secPerMin * tc.minPerHr * tc.hrPerDay)
  for (let time = yesterday; time <= now; time += tc.msPerSec * tc.secPerMin * tc.minPerHr) {
    timeStamps.push(time);
    funcOne.values.push(Math.floor(Math.random()*10));
    funcTwo.values.push(Math.floor(Math.random()*10));
    funcThree.values.push(Math.floor(Math.random()*10));
  };
  const unit = 'hour';

  const dataProp = {
    timeStamps,
    functions: [funcOne, funcTwo, funcThree]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        text: metric
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: unit,
        },
        min: yesterday - (tc.msPerSec * tc.secPerMin * tc.minPerHr),
        max: now + (tc.msPerSec * tc.secPerMin * tc.minPerHr),
      },
      y: {
        min: 0,
        max: 12,
      }
    },
    cubicInterpolationMode: 'monotone',
  };

  const datasets = dataProp.functions.map(func => {
    return {
      id: func.name,
      label: func.name,
      data: func.values,
    };
  })
  console.log(datasets)

   
  return (
    <div className= 'lineChartContainer'>
      <Line className='testChart'
        options={options}
        data={{
          labels: dataProp.timeStamps,
          datasets,
        }}
      />
    </div>
  )
  // }
};

export default LineChart;