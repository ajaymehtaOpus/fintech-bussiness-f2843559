const express = require('express');
const { registerUser, loginUser, recoverPassword } = require('../services/user-registration-and-login.service');

const router = express.Router();

// Route for user registration
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Route for password recovery
router.post('/recover', async (req, res) => {
    try {
        const { email } = req.body;
        await recoverPassword(email);
        res.status(200).json({ message: 'Password recovery email sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;