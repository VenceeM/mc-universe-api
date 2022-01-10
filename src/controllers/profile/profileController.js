const Profile = require('../../models/profile/profileModel.js')

/** Create User profile */
const createProfile = async (req, res) => {

    try {

        /** Check if the user already have profile */
        const isUserProfileExist = await Profile.findOne({ user_owner: req.user._id })

        if (isUserProfileExist) return res.status(400).send()

        const profile = new Profile({ ...req.body, user_owner: req.user._id })
        await profile.save()

        res.status(201).send()

    } catch (e) {
        res.status(500).send()
    }

}

/** Update User profile */
const getProfile = async (req, res) => {

    try {
        const profile = await Profile.findOne({ user_owner: req.user._id })
        if (!profile) res.status(404).send()
        res.status(200).send(profile)

    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    create: createProfile,
    getProfile: getProfile
}