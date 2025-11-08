const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/register', new AuthController().registerUser);
router.post('/login', new AuthController().loginUser);

module.exports = router