'use strict'

const uuidv4 = require('uuid/v4')

/**
 * Note abstraction
 */
class Note {
    /**
     * 
     * @param {string} userId 
     * @param {string} text 
     */
    constructor(userId, text) {
        this.id = uuidv4()
        this.userId = userId
        this.text = text
    }
}

const logic = {
    _notes: [],

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @throws
     */
    addNote(userId, text) {
        if (typeof userId !== 'string') throw Error('userId is not a string')

        if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

        if (typeof text !== 'string') throw Error('text is not a string')

        if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

        const note = new Note(userId, text)

        this._notes.push(note)

        return note.id
    },

    /**
     * 
     * @param {string} userId
     * @param {string} id 
     * 
     * @throws
     */
    retrieveNote(userId, id) {
        if (typeof userId !== 'string') throw Error('userId is not a string')

        if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

        if (typeof id !== 'string') throw Error('id is not a string')

        if (!(id = id.trim())) throw Error('id is empty or blank')

        const index = this._notes.findIndex(note => note.id === id && note.userId === userId)

        if (index < 0) throw Error(`note with id ${id} does not exist for userId ${userId}`)

        return this._notes[index]
    },

    /**
     * @param {string} userId
     * 
     * @throws
     */
    listNotes(userId) {
        if (typeof userId !== 'string') throw Error('userId is not a string')

        if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

        return this._notes.filter(note => note.userId === userId)
    },

    /**
     * 
     * @param {string} userId
     * @param {string} id 
     *
     * @throws
     */
    removeNote(userId, id) {
        if (typeof userId !== 'string') throw Error('userId is not a string')

        if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

        if (typeof id !== 'string') throw Error('id is not a string')

        if (!(id = id.trim())) throw Error('id is empty or blank')

        const index = this._notes.findIndex(note => note.id === id && note.userId === userId)

        if (index < 0) throw Error(`note with id ${id} does not exist for userId ${userId}`)

        this._notes.splice(index, 1)
    },

    /**
     * 
     * @param {string} userId
     * @param {string} id 
     * @param {string} text 
     * 
     * @throws
     */
    updateNote(userId, id, text) {
        if (typeof userId !== 'string') throw Error('userId is not a string')

        if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

        if (typeof id !== 'string') throw Error('id is not a string')

        if (!(id = id.trim())) throw Error('id is empty or blank')

        if (typeof text !== 'string') throw Error('text is not a string')

        if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

        const note = this._notes.find(note => note.id === id && note.userId === userId)

        if (!note) throw Error(`note with id ${id} does not exist for userId ${userId}`)

        note.text = text
    },

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @throws
     */
    findNotes(userId, text) {
        if (typeof userId !== 'string') throw Error('userId is not a string')

        if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

        if (typeof text !== 'string') throw Error('text is not a string')

        if (!text.length) throw Error('text is empty')

        return this._notes.filter(note => note.text.includes(text) && note.userId === userId)
    }
}

module.exports = logic