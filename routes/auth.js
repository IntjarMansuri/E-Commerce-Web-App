const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);

router.get('/signup', authController.signup);

router.post('/signup', authController.signupUser);

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

module.exports = router;