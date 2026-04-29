const express = require('express');
const { registerUser, loginUser, recoverPassword } = require('../services/auth.service');

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Password recovery route
router.post('/recover', async (req, res) => {
    try {
        await recoverPassword(req.body);
        res.status(200).json({ message: 'Recovery email sent.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;