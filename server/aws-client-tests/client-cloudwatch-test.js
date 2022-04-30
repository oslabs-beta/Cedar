//require in cloudwatch client and commands from aws-sdk
const {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricDataCommand
} = require('@aws-sdk/client-cloudwatch');

//require dotenv to read from .env file and grab credentials
const dotenv = require('dotenv');
dotenv.config();

const creds = {
    region: process.env.AWS_REGION.slice(2),
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	}
  };

  //console.log(creds)
//declare client passing in credentials from above
const metricClient = new CloudWatchClient(creds);
const end = Date.now()
const start = end - (1000*60*60*24*10);  // ms * s * m * h * d = days

//declare input parameters for command
const params = {
  EndTime: new Date(end),
  StartTime: new Date(start),
  LabelOptions: {
    // -0400 represents 4 hours and 0 minutes behind UTC, probably should not be hardcoded
    //maybe we can use the aws_region to specify the correct timezone 
    Timezone: '-0400', 
  },
  MetricDataQueries: [
    {
      Id: `mInvocations_AllLambdaFunc`,
      Label: `Lambda Invocations All Functions`,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: `Invocations`,
        },
        Period: 60, // 60 sec * 30 = 30 min
        Stat: 'Sum',
      },
    },
    {
      Id: `mInvocations_mir_app`,
      Label: `Lambda Invocations mir-app`,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'Invocations',
          Dimensions: [
            {
              Name: `FunctionName`,
              Value: `mir-app-HelloWorldFunction-54OVb43xIQbl`,
            },
          ],
        },
        Period: 60, // 60 sec * 30 = 30 min
        Stat: 'Sum',
      },
    },
    {
      Id: `mInvocations_test_func_app`,
      Label: `Lambda Invocations test-func-app`,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: 'Invocations',
          Dimensions: [
            {
              Name: `FunctionName`,
              Value: `test-func-app-HelloWorldFunction-2DJ2VlqjVGLQ`,
            },
          ],
        },
        Period: 60, // 60 sec * 30 = 30 min
        Stat: 'Sum',
      },
    },
  ]

};

//declare command with params passed in
const statCommand = new GetMetricStatisticsCommand(params);

const dataCommand = new GetMetricDataCommand(params);

const sendCommand = async () => {
  try {
    const data = await metricClient.send(dataCommand)
    console.log('u did it lol');
    console.log(data);
    console.log(data.MetricDataResults[0].Timestamps);
    console.log(Date.parse(JSON.parse(JSON.stringify(data.MetricDataResults[0].Timestamps[0]))));
    // console.log(data.MetricDataResults[0].Values);
    // console.log(data.MetricDataResults[1].Timestamps);
    // console.log(data.MetricDataResults[1].Values);
    // console.log(data.MetricDataResults[2].Timestamps);
    // console.log(data.MetricDataResults[2].Values);
  } catch (err) {
    console.log('error ):');
    console.log(err);
  }
}

console.log(sendCommand());