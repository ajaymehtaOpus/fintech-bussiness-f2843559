import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { email, password });
            alert(response.data.message);
        } catch (error) {
            alert('Error registering user: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register;