const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 6
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    verified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isMember: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Please use strong password')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

/** Create GenerateAuthToken */
userSchema.methods.generateAuthToken = async function () {
    const user = this
    /** Create token using jwt */
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    /** Save the token to user.tokens */
    user.tokens = user.tokens.concat({ token: token })
    await user.save()

    /** Return the token */
    return token

}

/** Find user credential */
userSchema.statics.findCredentials = async (email, password) => {

    /** Get the user email and find */
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('Email or password is invalid')

    /** Get the user password */
    const hashedPassword = await bcrypt.compare(password, user.password)
    if (!hashedPassword) throw new Error('Email or password is invalid')

    return user

}


/** Hash the password before saving */
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)

    }

    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User