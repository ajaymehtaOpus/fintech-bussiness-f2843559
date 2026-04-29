const db = require('../db'); // Assume a db module is available
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegistrationAndLoginService = {
    register: async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save user to the database
        const result = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
        return result.rows[0];
    },
    login: async (email, password) => {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            throw new Error('User not found.');
        }
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }
        const token = jwt.sign({ id: user.rows[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
        return { token, user: user.rows[0] };
    }
};

module.exports = userRegistrationAndLoginService;