const db = require('../db'); // Assuming a db module for database operations
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to register a new user
const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    return result.rows[0];
};

// Function to login a user
const loginUser = async (email, password) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
        throw new Error('User not found.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials.');
    }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secure secret
    return { user, token };
};

module.exports = { registerUser, loginUser };