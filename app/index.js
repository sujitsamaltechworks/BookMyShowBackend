const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ status: 'Success', message: 'Server is up and running' })
})

module.exports = app
