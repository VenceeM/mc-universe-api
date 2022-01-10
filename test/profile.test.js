const app = require('../src/app.js')
const request = require('supertest')
const { userOne, userOneId, initialSetup, profileOne, profileOneId, userTwo, userTwoId } = require('./fixture/default.js')

beforeEach(initialSetup)

/** Should create new profile */
test('should create new profile', async () => {
    await request(app)
        .post('/api/profiles')
        .set('Authorization', userTwo.tokens[0].token)
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

/**
 * Should not create new profile when there is already created
 * profile for that user
 */
test('should not create new profile when there is already created', async () => {
    await request(app)
        .post('/api/profiles')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            first_name: 'Vencee',
            last_name: 'Manansala'
        })
        .expect(400)
})

/** Should get the user profile */
test('should get user profile', async () => {
    await request(app)
        .get('/api/profiles')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200)
})

/** Should not get the user profile when no login user */
test('should not get user profile when no login user', async () => {
    await request(app)
        .get('/api/profiles')
        .send()
        .expect(401)
})