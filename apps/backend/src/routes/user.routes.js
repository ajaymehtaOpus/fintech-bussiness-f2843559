const express = require('express');
const { registerValidator, loginValidator, validate } = require('../validators/user-registration-and-login.validator');
const { registerUser, loginUser } = require('../services/user-registration-and-login.service');

const router = express.Router();

// Route for user registration
router.post('/register', registerValidator, validate, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for user login
router.post('/login', loginValidator, validate, async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;