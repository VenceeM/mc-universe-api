const express = require('express')
const auth = require('../../middleware/auth.js')
const { create, getProfile, updateProfile } = require('../../controllers/profile/profileController.js')


const router = new express.Router()


/** Create profile */
router.post('/profiles', auth, create)

/** Get profile */
router.get('/users/me', auth, getProfile)

/** Update Profile */
router.patch('/users/me', auth, updateProfile)

module.exports = router