//require in utility functions
const utilities = require('./utilities/metricUtilities.js')

//this is what we will attatch middleware onto and export
const metricController = {};

metricController.getMetrics = async (req, res, next) => {
  try {
    //pull variables off of req.body
    //funcs and metrics will be arrays
    const { start, end, funcs, metrics } = req.body;
    
    //create an object that will represent each function with a unique key
    //we will use this to make parsing through our data more seamless
    const funcObj = {};
    for (let i = 0; i < funcs.length; i += 1){
        funcObj[`func${i}`] = funcs[i]
    };

    //call prep and send function in the utilites folder in the metricUtilities.js file
    //this will prep parameters and send the getMetricDataCommand command to retrieve lambda metrics
    const response = await utilities.prepAndSend(start, end, funcs, metrics);

    //attatch the invocation of the parse data function onto res.locals
    //parseData is in the utilites folder in the metricUtilities.js file
    res.locals.metricsData = await utilities.parseData(response, funcObj);
    console.log('~~~SUCCESS~~~')
    return next();
  } catch (err) {
    console.log('~~~ERROR~~~', err)
    return next({
      log: 'An error occurred in metricController.getMetrics middleware',
      message: {err: 'An error occurred while retreiving metric data'}
    })
  };

};

module.exports = metricController;
