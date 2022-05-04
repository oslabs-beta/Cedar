//require in utility functions
const utilities = require('./utilities/metricUtilities.js')

//this is what we will attatch middleware onto and export
const metricController = {};

metricController.getMetrics = async (req, res, next) => {
  try {
    //pull variables off of req.body
    //funcs and metrics will be arrays
    const { start, end, funcs, metrics } = req.body;
    
    //call prep and send function in the utilites folder uner metricUtilities
    //this will prep parameters and send the getMetricDataCommand command to retrieve lambda metrics
    const response = await utilities.prepAndSend(start, end, funcs, metrics);

    const data = [];
    
    //console.log(response);
    //loop through the response
    //we will send back an array of objects to the front end in this format:


    // [
    //   {
    //    'helloWord': {
    //     metrics: [
    //      ‘Invocations’: {
    //         timestamps: []
    //         vals: []
    //       },
    //      ‘Errors’: {
    //         timestamps: []
    //         vals: []
    //       },
    //      }
    
    const parseData = async () => {
      //create a cache object
      const cache = {};
    
      //loop through data
      response.forEach(el => {
        //if element doesnt exist in the cache, create a key for it
        //im sorry
        if (!cache[funcs[Number(el.Id[el.Id.length - 1])]]){
          cache[funcs[Number(el.Id[el.Id.length - 1])]] = { metrics  : [] }
          //push into the metrics array
         
          const obj = {}

          obj[el.Label] = { 
            timestamps: el.Timestamps,
            vals: el.Values
          }

          cache[funcs[Number(el.Id[el.Id.length - 1])]].metrics.push(obj)


        } 
        else if (cache[funcs[Number(el.Id[el.Id.length - 1])]]){
          //if the key exists, we have to check the metric key to see if the metric exists
          // cache[funcs[Number(el.Id[el.Id.length - 1])]].metrics.forEach(metric => {
          const metricsInCache = cache[funcs[Number(el.Id[el.Id.length - 1])]].metrics;
          let metricFound = false;
          for (let i = 0; i < metricsInCache.length; i++) {
            // console.log('metrics in cache: ', metricsInCache[i]);
            // console.log('metric to add: ', el.Label);
            if (metricsInCache[i][el.Label]){
              metricFound = true;
              metricsInCache[i][el.Label].timestamps = metricsInCache[i][el.Label].timestamps.concat(el.Timestamps),
              metricsInCache[i][el.Label].vals = metricsInCache[i][el.Label].vals.concat(el.Values);
              break;
            }
          }            
          if (!metricFound){
            const obj = {};
            obj[el.Label] = { 
              timestamps: el.Timestamps,
              vals: el.Values
            }
            cache[funcs[Number(el.Id[el.Id.length - 1])]].metrics.push(obj);
          } 
        }
      })
      console.log(cache);
      return cache;
    }


    res.locals.metricsData = await parseData();
    console.log('~~~SUCCESS~~~')
    return next();
  } catch (err) {
    console.log('~~~ERROR~~~', err)
    return next({
      log: 'An error occurred in metricController.getMetrics middleware',
      message: {err: 'An error occurred while retreiving metric data'}
    })
  }

}

module.exports = metricController;

         