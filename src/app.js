const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user/user.js')


/** Load the database */
require('./db/db.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', userRouter)


module.exports = app