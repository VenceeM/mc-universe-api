const express = require('express')
const cors = require('cors')

/** Load the database */
require('./db/db.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())


module.exports = app