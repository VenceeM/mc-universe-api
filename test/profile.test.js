const app = require('../src/app.js')
const request = require('supertest')
const { userOne, userOneId, initialSetup } = require('./fixture/default.js')

beforeEach(initialSetup)

/** Should create new profile */
test('should create new profile', async () => {
    await request(app)
        .post('/api/profiles')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            first_name: 'Vencee',
            last_name: 'Manansala'
        })
        .expect(201)
})

/** Should not create new profile when there is no login user */
test('should not create new profile', async () => {
    await request(app)
        .post('/api/profiles')
        .send({
            first_name: 'Vencee',
            last_name: 'Manansala'
        })
        .expect(401)
})