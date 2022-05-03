const express = require('express');

const functionController = require('../controllers/AWS/functionController.js');
const metricController = require('../controllers/AWS/metricController.js');
const logController = require('../controllers/AWS/logController.js');

const router = express.Router();

router.get('/getFunctionNames', functionController.getFuncs, (req, res) => {
  res.status(200).json(res.locals.lambdaFuncs);
});

router.post('/getMetricData', metricController.getMetrics, (req, res) => {
  res.status(200).json(res.locals.metricsData);
});

router.post('/getLogsData', logController.getLogs, (req, res) => {
  res.status(200).json(res.locals.logs);
});

module.exports = router;