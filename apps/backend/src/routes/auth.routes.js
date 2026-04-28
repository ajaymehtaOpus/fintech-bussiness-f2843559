const express = require('express');
const { registerUser, loginUser, recoverPassword } = require('../controllers/auth.controller');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for password recovery
router.post('/recover', recoverPassword);

module.exports = router;