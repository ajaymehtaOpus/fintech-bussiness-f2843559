import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit'>Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RegisterForm;