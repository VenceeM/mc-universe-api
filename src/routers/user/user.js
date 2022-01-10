const express = require('express')
const auth = require('../../middleware/auth.js')
const { register, login, logout, logoutAll } = require('../../controllers/user/userController.js')

const router = new express.Router()

/** User registration */
router.post('/users', register)

/** User login */
router.post('/users/login', login)

/** User logout */
router.post('/users/logout', auth, logout)

/** Logout all user device */
router.post('/users/logout-all', auth, logoutAll)

module.exports = router