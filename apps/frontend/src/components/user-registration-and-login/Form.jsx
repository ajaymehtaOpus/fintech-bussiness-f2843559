import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const response = await axios.post(endpoint, { email, password });
            alert(response.data.message);
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
            <button type='button' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
        </form>
    );
};

export default Form;