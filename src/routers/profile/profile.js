const express = require('express')
const auth = require('../../middleware/auth.js')
const { create } = require('../../controllers/profile/profileController.js')


const router = new express.Router()


/** Create profile */
router.post('/profiles', auth, create)

module.exports = router