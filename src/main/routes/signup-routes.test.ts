import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Sign Up Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
