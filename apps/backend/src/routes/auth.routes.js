const express = require('express');
const { registerUser, loginUser, recoverPassword } = require('../controllers/auth.controller');

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Password Recovery
router.post('/recover', recoverPassword);

module.exports = router;