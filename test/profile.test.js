const app = require('../src/app.js')
const request = require('supertest')
const { userOne, userOneId, initialSetup, profileOne, profileOneId, userTwo, userTwoId } = require('./fixture/default.js')
const Profile = require('../src/models/profile/profileModel.js')

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
        .get('/api/users/me')
        .set('Authorization', userOne.tokens[0].token)
        .send()
        .expect(200)

})

/** Should not get the user profile when no login user */
test('should not get user profile when no login user', async () => {
    await request(app)
        .get('/api/users/me')
        .send()
        .expect(401)
})

/** Should update user profile */
test('should update user profile', async () => {
    const response = await request(app)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            first_name: 'Vencee',
            last_name: 'Ubaldo',
            avatar: '',
            favorite_hero: 'Spiderman',
            favorite_hero_img: '',
            profile_bg: ''
        })
        .expect(200)

    const updatedProfile = await Profile.findOne({ _id: response.body._id })
    expect(updatedProfile.favorite_hero).toEqual('Spiderman')
})

/** Should not update user profile */
test('should not update user profile', async () => {
    await request(app)
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            first_name: 'Vencee',
            last_name: 'Ubaldo',
            avatar: '',
            favorite_hero: 'Spiderman',
            asdfadsfa: 'awet'
        })
        .expect(400)
})