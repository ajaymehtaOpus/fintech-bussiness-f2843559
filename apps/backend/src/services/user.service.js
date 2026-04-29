const db = require('../config/db');

// Create a new user
exports.createUser = async (userData) => {
    const { email, password } = userData;
    const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
    return result.rows[0];
};

// Find user by email
exports.findUserByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};