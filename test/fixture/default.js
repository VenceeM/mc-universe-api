const mongoose = require('mongoose')
const User = require('../../src/models/user/userModel.js')
const Profile = require('../../src/models/profile/profileModel.js')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'mrcee19',
    email: 'cee@gmail.com',
    password: 'Mukangwiz112',
    tokens: [
        {
            token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET)
        }
    ]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'mrcee112',
    email: 'cee112@gmail.com',
    password: 'Mukangwiz112',
    tokens: [
        {
            token: jwt.sign({ _id: userTwoId.toString() }, process.env.JWT_SECRET)
        }
    ]
}

const profileOneId = new mongoose.Types.ObjectId()
const profileOne = {
    _id: profileOneId,
    first_name: 'Vencee',
    last_name: 'Manansala'
}


/** Initial setup database */
const initialSetup = async () => {
    await User.deleteMany()
    await Profile.deleteMany()

    await new User(userOne).save()
    await new User(userTwo).save()
    await new Profile({ ...profileOne, user_owner: userOneId }).save()

}


module.exports = {
    userOneId: userOneId,
    userOne: userOne,
    userTwo: userTwo,
    userTwoId: userTwoId,
    initialSetup: initialSetup,
    profileOne: profileOne,
    profileOneId: profileOneId,

}