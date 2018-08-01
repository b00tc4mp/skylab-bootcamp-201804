const express = require('express')
const logic = require('../logic')

const router = express.Router()

router.post('/users/:userId/notes', (req, res) => {
    const { params: { userId }, body: { text } } = req

    try {
        const id = logic.addNote(userId, text)

        res.status(201)

        res.json({ status: 'OK', data: { id } })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

router.get('/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id } } = req

    try {
        const note = logic.retrieveNote(userId, id)

        res.json({ status: 'OK', data: note })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

router.get('/users/:userId/notes', (req, res) => {
    const { params: { userId }, query: { q } } = req

    if (q) {
        try {
            res.json({ status: 'OK', data: logic.findNotes(userId, q) })
        } catch ({ message }) {
            res.status(400)

            res.json({ status: 'KO', error: message })
        }
    } else
        res.json({ status: 'OK', data: logic.listNotes(userId) })
})

router.delete('/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id } } = req

    try {
        logic.removeNote(userId, id)

        res.json({ status: 'OK' })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

router.patch('/users/:userId/notes/:id', (req, res) => {
    const { params: { userId, id }, body: { text } } = req

    try {
        logic.updateNote(userId, id, text)

        res.json({ status: 'OK' })
    } catch ({ message }) {
        res.status(400)

        res.json({ status: 'KO', error: message })
    }
})

module.exports = router