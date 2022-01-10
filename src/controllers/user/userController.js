const User = require('../../models/user/userModel.js')

/** Create or register user */
const userRegister = async (req, res) => {

    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) return res.status(400).send({ message: 'Please check all the required fields' })
        const data = { username, email, password }
        const user = new User(data)
        await user.save()

        res.status(201).send()

    } catch (e) {
        res.status(500).send()
    }
}

/** User login */
const userLogin = async (req, res) => {

    try {
        const user = await User.findCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.status(200).send({
            user: user,
            token: token
        })

    } catch (e) {
        res.status(401).send(e.message)
    }
}

/** User Logout */
const userLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send()

    } catch (e) {
        res.status(500).send(e.message)
    }
}

/** Logout all user device */
const userLogoutAll = async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()

    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    register: userRegister,
    login: userLogin,
    logout: userLogout,
    logoutAll: userLogoutAll
}