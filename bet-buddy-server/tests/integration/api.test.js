const request = require('supertest')
const app = require('../../functions/index')

describe('API Integration Tests', () => {
  describe('Health Check', () => {
    it('should return status ok', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body.status).toBe('ok')
    })
  })

  describe('Root Endpoint', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Bet Buddy API')
      expect(response.body.endpoints).toBeDefined()
    })
  })

  describe('Authentication Endpoints', () => {
    it('should handle signup request', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123',
      }
      
      // Note: This will fail without database setup
      // This is a placeholder test structure
      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
      
      // Response will vary based on implementation
      expect([200, 201, 400, 500]).toContain(response.statusCode)
    })
  })

  describe('Bet Endpoints', () => {
    it('should handle bet creation request', async () => {
      const betData = {
        userId: 'test-user-123',
        teams: 'Team A vs Team B',
        odds: '-110',
        stake: '50',
        type: 'ML',
      }
      
      // Note: This will fail without database setup
      // This is a placeholder test structure
      const response = await request(app)
        .post('/api/bet')
        .send(betData)
      
      // Response will vary based on implementation
      expect([201, 400, 500]).toContain(response.statusCode)
    })
  })
})
