import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            setMessage(response.data.message);
            // Store token in local storage or state
        } catch (error) {
            setMessage('Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <button type='submit'>Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;