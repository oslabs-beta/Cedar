const express = require('express');
const userController = require('../controllers/userController')
const cookieController = require('../controllers/cookieController')
const sessionController = require('../controllers/sessionController')
const stsController = require('../controllers/AWS/stsController')
const functionController = require('../controllers/AWS/functionController')

const router = express.Router();

router.post('/login', 
  userController.login, 
  cookieController.setCookie,
  sessionController.startSession,
  stsController.getCreds, 
  functionController.getFuncs, 
  (req, res) => {
    res.status(200).json(res.locals.data);
});

router.post('/signup', userController.signUp, (req, res) => {
  res.status(200).send('signup successful')
});

router.post('/logout', sessionController.logOut, (req, res) => {
  res.status(200).send('user logout successful')
});

module.exports = router;