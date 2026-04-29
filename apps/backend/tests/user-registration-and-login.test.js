const request = require('supertest');
const app = require('../src/app');

describe('User Registration and Login', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.status).toBe(201);
    });

    it('should log in with valid credentials', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({ email: 'test@example.com', password: 'password123' });
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should return 401 for invalid login', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });
        expect(response.status).toBe(401);
    });
});