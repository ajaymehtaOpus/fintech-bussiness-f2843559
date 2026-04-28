import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <button type='submit'>Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;