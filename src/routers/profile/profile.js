const express = require('express')
const auth = require('../../middleware/auth.js')
const { create, getProfile } = require('../../controllers/profile/profileController.js')


const router = new express.Router()


/** Create profile */
router.post('/profiles', auth, create)

/** Get profile */
router.get('/profiles', auth, getProfile)

module.exports = router