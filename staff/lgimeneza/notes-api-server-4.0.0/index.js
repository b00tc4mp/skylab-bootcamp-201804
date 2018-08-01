'use strict'

const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes')
const logic = require('./src/logic')

MongoClient.connect('mongodb://localhost:27017/skylab-bootcamp-201804', { useNewUrlParser: true }, (err, conn) => {
    if (err) throw err

    const db = conn.db()

    logic.init(db)

    const port = process.argv[2] || 3000

    const app = express()
    app.use(bodyParser.json()) // middleware

    app.use('/api', router)

    app.listen(port, () => console.log(`server running on port ${port}`))

    process.on('SIGINT', () => {
        console.log('\nstopping server')

        conn.close()

        process.exit()
    })

})