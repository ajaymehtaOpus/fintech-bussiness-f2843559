const db = require('../config/db');

// Create a new user
exports.createUser = async (userData) => {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [userData.email, userData.password];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Find user by email
exports.findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await db.query(query, values);
    return result.rows[0];
};