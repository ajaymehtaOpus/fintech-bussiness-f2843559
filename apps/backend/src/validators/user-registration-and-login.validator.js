const { body, validationResult } = require('express-validator');

// Validator for user registration
const registerValidator = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

// Validator for user login
const loginValidator = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Password cannot be empty.')
];

// Function to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { registerValidator, loginValidator, validate };