const UserService = require('../services/user.service');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.createUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.authenticateUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Password recovery
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await UserService.sendPasswordRecoveryEmail(email);
        res.status(200).json({ message: 'Recovery email sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};