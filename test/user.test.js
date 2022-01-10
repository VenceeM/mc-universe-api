const app = require('../src/app.js')
const request = require('supertest')
const { userOne, userOneId, initialSetup } = require('./fixture/default.js')

beforeEach(initialSetup)


/** Should create new user */
test('should create new user', async () => {
    await request(app)
        .post('/api/users')
        .send({
            username: 'mrcee112',
            email: 'mrcee@gmail.com',
            password: 'Mukangwiz112'
        })
        .expect(201)
})

/** Should not createn new user */
test('should not create new user', async () => {
    await request(app)
        .post('/api/users')
        .send({
            email: 'cee@gmail.com',
            password: 'Mukangwiz112'
        })
        .expect(400)
})

/** Should login the user */
test('should login the user', async () => {
    await request(app)
        .post('/api/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)
})

/** Should not login the user */
test('should not login the user', async () => {
    await request(app)
        .post('/api/users/login')
        .send({
            email: "email@gmail.com",
            password: 'password123'
        })
        .expect(401)
})

/** Should return token after login */
test('should return token after login', async () => {
    const response = await request(app)
        .post('/api/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    expect(response.body.token).not.toBeNull()
})

/** Should logout the user */
test('should logout the user', async () => {
    await request(app)
        .post('/api/users/logout')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200)
})

/** Should not logout the user when there is no auth token*/
test('should not logout the user', async () => {
    await request(app)
        .post('/api/users/logout')
        .send()
        .expect(401)
})

/** Should logout all user device */
test('should logout all user device', async () => {
    await request(app)
        .post('/api/users/logout-all')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200)
})

/** Should not logout all user device when there is no auth token*/
test('should not logout all user device', async () => {
    await request(app)
        .post('/api/users/logout-all')
        .send()
        .expect(401)
})