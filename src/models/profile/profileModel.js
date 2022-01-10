const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        trim: true,

    },
    favorite_hero: {
        type: String,
        trim: true
    },
    favorite_hero_img: {
        type: String,
        trim: true
    },
    profile_bg: {
        type: String,
        trim: true
    },
    user_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile