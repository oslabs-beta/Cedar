const express = require('express');
const router = express.Router();

const functionController = require('../controllers/AWS/functionController');
const metricController = require('../controllers/AWS/metricController');
const logController = require('../controllers/AWS/logController');

