const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    return result.rows[0];
};

// Authenticate user
exports.authenticateUser = async (email, password) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
};

// Send password recovery email
exports.sendPasswordRecoveryEmail = async (email) => {
    // Logic to send recovery email (e.g., using SendGrid)
    console.log(`Sending recovery email to ${email}`);
};