import request from 'supertest'
import app from '../config/app'

describe('Sign Up Routes', () => {
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup')
      .send({
        name: 'Name',
        email: 'email@mail.com',
        password: 'pass123',
        passwordConfirmation: 'pass123'
      })
      .expect(200)
  })
})
