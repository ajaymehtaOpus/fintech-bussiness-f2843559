const { body, validationResult } = require('express-validator');

// Validation rules for user registration and login
const userRegistrationAndLoginValidator = {
    register: [
        body('email').isEmail().withMessage('Please provide a valid email address.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    ],
    login: [
        body('email').isEmail().withMessage('Please provide a valid email address.'),
        body('password').notEmpty().withMessage('Password cannot be empty.')
    ],
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};

module.exports = userRegistrationAndLoginValidator;