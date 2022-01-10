const jwt = require('jsonwebtoken')
const User = require('../models/user/userModel.js')
const auth = async (req, res, next) => {

    try {

        /** Get the token from the header */
        const token = req.header('Authorization').replace('Bearer', '').trim()

        /** Verify the token */
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        /** Get the user using the verified token */
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user) throw new Error()

        /** Take the token and the user info  */
        req.token = token
        req.user = user

        next()


    } catch (e) {
        res.status(401).send()
    }
}


module.exports = auth