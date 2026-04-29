const db = require('../db'); // Assume db is a configured PostgreSQL client
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to register a new user
const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, hashedPassword];
    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

// Function to login a user
const loginUser = async (email, password) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
        const result = await db.query(query, [email]);
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        return { user, token };
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
};

module.exports = { registerUser, loginUser };