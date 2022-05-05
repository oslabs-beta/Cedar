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

// props: metric: str, funcs: {name:{timestamps, vals}, {}}, period
// props: x & y mins and max
// processing: given a period, determine:
  // x axis scale and new timestamps for that period - DONE
  // y axis vals for each function in each new timestamp - DONE
  // outputs - new labels array, array of functions, each an obj with name, values, maybe some other stuff
function  LineGraph (props) {
  // const metric = 'Invocations';
  // const timeStamps = [];
  // const funcOne = {
  //   name: 'funcOne',
  //   values: []
  // };
  // const funcTwo = {
  //   name: 'funcTwo',
  //   values: []
  // };
  // const funcThree = {
  //   name: 'funcThree',
  //   values: []
  // };
  // const now = Date.now();
  // const yesterday = now - (tc.msPerSec * tc.secPerMin * tc.minPerHr * tc.hrPerDay)
  // for (let time = yesterday; time <= now; time += tc.msPerSec * tc.secPerMin * tc.minPerHr) {
  //   timeStamps.push(time);
  //   funcOne.values.push(Math.floor(Math.random()*10));
  //   funcTwo.values.push(Math.floor(Math.random()*10));
  //   funcThree.values.push(Math.floor(Math.random()*10));
  // };
  const { timestamps, unitName, timeMin, metricName, functions } = props.dataProp;
  console.log(timestamps);
  console.log(functions);
  // const unit = 'hour';

  // const dataProp = {
  //   timeStamps,
  //   functions: [funcOne, funcTwo, funcThree]
  // };

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
        // max: now + (tc.msPerSec * tc.secPerMin * tc.minPerHr),
      },
      y: {
        min: 0,
        // max: 12,
      }
    },
    cubicInterpolationMode: 'monotone',
  };
  console.log(options);

  // const datasets = dataProp.functions.map(func => {
  //   return {
  //     id: func.name,
  //     label: func.name,
  //     data: func.values,
  //   };
  // })

   
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
  // }
};

export default LineGraph;