const express = require('express');
const userController = require('../controllers/userController')
const stsController = require('../controllers/AWS/stsController')
const functionController = require('../controllers/AWS/functionController')

const router = express.Router();

router.post('/login', userController.login, stsController.getCreds, functionController.getFuncs, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/signup', userController.signUp, (req, res) => {
  res.status(200).send('signup successful')
});

module.exports = router;