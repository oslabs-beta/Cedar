const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/login', userController.login, (req, res) => {
  res.status(200).send('login successful');
});

router.post('signup', userController.signUp, (req, res) => {
  res.redirect('/login');
});