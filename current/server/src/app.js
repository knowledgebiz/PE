const express = require('express')
require('./db/connection')

const port = process.env.PORT
const app = express()

app.use(express.json())

app.listen(port, () => {
    console.log('Connected on port', port)
})