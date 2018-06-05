'use strict'

require('dotenv').config()

const { mongoose } = require('auction-data')
const express = require('express')
const router = require('./src/routes')
const cors = require('cors')

const { env: { PORT, DB_URL } } = process

mongoose.connect(DB_URL)
    .then(() => {
        const port = PORT || 5000

        const app = express()

        app.use(cors())

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))

        process.on('SIGINT', () => {
            console.log('\nstopping server')

            mongoose.connection.close(() => {
                console.log('db connection closed')

                process.exit()
            })
        })
    })
    .catch(console.error)