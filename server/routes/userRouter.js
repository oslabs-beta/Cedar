const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/login', userController.login, (req, res) => {
  res.status(200).send('login successful');
});

router.post('/signup', userController.signUp, (req, res) => {
  res.redirect('/login');
});

module.exports = router;