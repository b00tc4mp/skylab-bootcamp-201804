
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const port = process.argv[2] || 3000

const app = express()
app.use(bodyParser.json()) // middleware

let notes = []

app.post('/api/notes', (req, res) => {
    const { body: { userId, text } } = req

    try {
        const id = logic.addNote(userId, text)
        res.status(201).json({ status: 'OK', data: { id } })

    } catch ({ message }) {
        res.status(400).json({ status: 'KO', error: message })
    }
})

app.get('/api/notes/:id', (req, res) => {
    const { params: { id } } = req

    try {
        const note = logic.retrieveNote(id)

        res.json({ status: 'OK', data: note })
    } catch ({ message }) {
        res.status(400).json({ status: 'KO', error: message })
    }
})

app.get('/api/notes', (req, res) => {
    const { query: { userId, q } } = req

    if (q) {
        try {
            res.json({ status: 'OK', data: logic.findNotes(userId, q) })
        } catch ({ message }) {
            res.status(400).json({ status: 'KO', error: message })
        }
    } else{
        try {
            res.json({ status: 'OK', data: logic.listNotes(userId) })
        } catch (error) {
            res.status(400).json({ status: 'KO', error: message })
        }
    }})

app.delete('/api/notes/:id', (req, res) => {
    const { params: { id } } = req

    try {
        logic.removeNote(id)

        res.json({ status: 'OK' })
    } catch ({ message }) {
        res.status(400).json({ status: 'KO', error: message })
    }
})

app.put('/api/notes/:id', (req, res) => {
    const { params: { id }, body: { text } } = req

    try {
        logic.updateNote(id, text)

        res.json({ status: 'OK' })
    } catch ({ message }) {
        res.status(400).json({ status: 'KO', error: message })
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})