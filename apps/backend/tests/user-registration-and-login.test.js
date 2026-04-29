const request = require('supertest');
const express = require('express');
const userRoutes = require('../src/routes/user-registration-and-login.routes');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Registration and Login', () => {
    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login a user', async () => {
        await request(app)
            .post('/api/register')
            .send({ email: 'test@example.com', password: 'password123' });
        const response = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
    });
});