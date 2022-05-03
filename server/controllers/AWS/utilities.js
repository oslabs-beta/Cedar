//utility functions to help modularize middleware
const utilities = {};

utilities.prepMetricParams = (start, end, funcs, metrics) => {
  params = {
    EndTime: new Date(end * 1000),
    StartTime: new Date(start * 1000),
    MetricDataQueries: []
  };

  console.log('end', params.EndTime);
  console.log('start', params.StartTime);
  //populate metric data query array using a sad loop
  console.log('in utils')
  //func loop
  for (let i = 0; i < funcs.length; i += 1){
    //metric loop
    for (let j = 0; j < metrics.length; j += 1){
      params.MetricDataQueries.push({
        //create a unique id using the metric name and func index
        Id: `m${metrics[j]}_${i}`,
        Label: metrics[j],
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: metrics[j],
            Dimensions: [
              {
                Name: 'FunctionName',
                Value: funcs[i]
              }
            ],
          },
          Period: 60,
          Stat: 'Sum'
        },
      });
    }
  }
  return params;
}


module.exports = utilities;