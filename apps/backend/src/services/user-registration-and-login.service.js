const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assuming db is set up for PostgreSQL

const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    return result.rows[0];
};

const loginUser = async (email, password) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secure secret
    return token;
};

const recoverPassword = async (email) => {
    // Logic for sending password recovery email (e.g., using SendGrid)
    // This is a placeholder for actual email sending logic
    console.log(`Password recovery email sent to ${email}`);
};

module.exports = { registerUser, loginUser, recoverPassword };