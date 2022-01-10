const Profile = require('../../models/profile/profileModel.js')

/** Create User profile */
const createProfile = async (req, res) => {

    try {
        const profile = new Profile({ ...req.body, user_owner: req.user._id })
        await profile.save()

        res.status(201).send()

    } catch (e) {
        res.status(500).send()
    }

}

module.exports = {
    create: createProfile
}