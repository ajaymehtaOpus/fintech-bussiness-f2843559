const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assume a database module is available

// Register a new user
const registerUser = async (userData) => {
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    return newUser.rows[0];
};

// Login user
const loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) throw new Error('User not found');
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.rows[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
};

// Recover password
const recoverPassword = async (email) => {
    // Logic to send recovery email (not implemented)
    console.log(`Recovery email sent to ${email}`);
};

module.exports = { registerUser, loginUser, recoverPassword };