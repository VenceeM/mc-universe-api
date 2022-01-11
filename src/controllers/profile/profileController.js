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

/** Get User profile */
const getProfile = async (req, res) => {

    try {
        const profile = await Profile.findOne({ user_owner: req.user._id })
        if (!profile) res.status(404).send()
        res.status(200).send(profile)

    } catch (e) {
        res.status(500).send()
    }
}

/** Update User profile */
const updateProfile = async (req, res) => {
    const fields = Object.keys(req.body)
    const allowedField = ['first_name', 'last_name', 'avatar', 'favorite_hero', 'favorite_hero_img', 'profile_bg']
    const isFieldAllowed = fields.every((field) => {
        return allowedField.includes(field)
    })

    if (!isFieldAllowed) return res.status(400).send()

    try {
        const profile = await Profile.findOne({ user_owner: req.user._id })
        if (!profile) return res.status(404).send()

        fields.forEach((field) => {
            profile[field] = req.body[field]
        })

        await profile.save()

        res.status(200).send(profile)

    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    create: createProfile,
    getProfile: getProfile,
    updateProfile: updateProfile

}