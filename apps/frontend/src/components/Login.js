import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            alert(response.data.message);
            // Store token in local storage or state
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;