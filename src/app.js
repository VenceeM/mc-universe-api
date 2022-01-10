const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user/user.js')
const profileRouter = require('./routers/profile/profile.js')

/** Load the database */
require('./db/db.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', userRouter)
app.use('/api', profileRouter)

module.exports = app