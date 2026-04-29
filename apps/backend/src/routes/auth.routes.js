const express = require('express');
const { registerUser, loginUser, recoverPassword } = require('../controllers/auth.controller');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Password recovery route
router.post('/recover', recoverPassword);

module.exports = router;