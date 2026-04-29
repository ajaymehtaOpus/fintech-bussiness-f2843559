const express = require('express');
const router = express.Router();
const userRegistrationAndLoginValidator = require('../validators/user-registration-and-login.validator');
const userRegistrationAndLoginService = require('../services/user-registration-and-login.service');

// User registration route
router.post('/register', userRegistrationAndLoginValidator.register, userRegistrationAndLoginValidator.validate, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRegistrationAndLoginService.register(email, password);
        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login route
router.post('/login', userRegistrationAndLoginValidator.login, userRegistrationAndLoginValidator.validate, async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await userRegistrationAndLoginService.login(email, password);
        res.status(200).json({ message: 'Login successful.', token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;