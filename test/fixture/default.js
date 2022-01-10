const mongoose = require('mongoose')
const User = require('../../src/models/user/userModel.js')
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


/** Initial setup database */
const initialSetup = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}


module.exports = {
    userOneId: userOneId,
    userOne: userOne,
    initialSetup: initialSetup,
}