const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        email: userData.email,
        password: hashedPassword
    });
    await user.save();
    return user;
};

const loginUser = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    return token;
};

const recoverPassword = async (userData) => {
    // Logic for password recovery (e.g., sending email)
    console.log('Password recovery requested for:', userData.email);
};

module.exports = { registerUser, loginUser, recoverPassword };