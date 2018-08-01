'use strict'

const expect = require('expect')
const logic = require('./logic')

describe('logic (notes)', () => {
    const { _notes } = logic

    beforeEach(() => _notes.length = 0)

    describe('add note', () => {
        it('should add on correct data', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote('my note')

            expect(id).toBeDefined()
            expect(_notes.length).toBe(1)

            const [note] = _notes

            expect(note.id).toBeDefined()
            expect(note.id).toBe(id)
            expect(note.text).toBe('my note')
        })

        it('should add notes with different ids', () => {
            expect(_notes.length).toBe(0)

            logic.addNote('my note 1')
            logic.addNote('my note 2')
            logic.addNote('my note 3')

            expect(_notes.length).toBe(3)

            const [note1, note2, note3] = _notes

            expect(note1.id).not.toBe(note2.id)
            expect(note2.id).not.toBe(note3.id)
            expect(note3.id).not.toBe(note1.id)

            expect(note1.text).toBe('my note 1')
            expect(note2.text).toBe('my note 2')
            expect(note3.text).toBe('my note 3')
        })

        it('should throw error on no text', () => {
            expect(() => logic.addNote()).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.addNote('')).toThrowError('text is empty or blank')
        })

        it('should throw error on blank text', () => {
            expect(() => logic.addNote('   ')).toThrowError('text is empty or blank')
        })
    })

    it('should list notes', () => {
        expect(_notes.length).toBe(0)

        logic.addNote('my note 1')
        logic.addNote('my note 2')
        logic.addNote('my note 3')

        expect(_notes.length).toBe(3)

        const notes = logic.listNotes()

        expect(notes.length).toBe(_notes.length)
        expect(notes).toBe(_notes)
    })

    describe('retrieve note', () => {
        it('should succeed on correct data', () => {
            expect(_notes.length).toBe(0)

            const id = logic.addNote('my note')

            expect(_notes.length).toBe(1)

            const note = logic.retrieveNote(id)

            expect(note).toBeDefined()
            expect(note.id).toBe(id)
            expect(note.text).toBe('my note')
        })

        it('should throw error on no id', () => {
            expect(() => logic.retrieveNote()).toThrowError('id is not a string')
        })

        it('should throw error on empty id', () => {
            expect(() => logic.retrieveNote('')).toThrowError('id is empty or blank')
        })

        it('should throw error on blank id', () => {
            expect(() => logic.retrieveNote('             ')).toThrowError('id is empty or blank')
        })

        it('should throw error on wrong id', () => {
            const id = 'non-existing-note-id'

            expect(() => logic.retrieveNote(id)).toThrowError(`note with id ${id} does not exist`)
        })
    })

    describe('remove note', () => {
        it('should remove a note', () => {
            expect(_notes.length).toBe(0)

            logic.addNote('my note')

            expect(_notes.length).toBe(1)

            const [note] = _notes

            logic.removeNote(note.id)

            expect(_notes.length).toBe(0)
            expect(_notes).toBe(logic._notes)
        })

        it('should throw error on no id', () => {
            expect(() => logic.removeNote()).toThrowError('id is not a string')
        })

        it('should throw error on empty id', () => {
            expect(() => logic.removeNote('')).toThrowError('id is empty or blank')
        })

        it('should throw error on blank id', () => {
            expect(() => logic.removeNote('             ')).toThrowError('id is empty or blank')
        })

        it('should throw error on wrong id', () => {
            const id = 'non-existing-note-id'

            expect(() => logic.removeNote(id)).toThrowError(`note with id ${id} does not exist`)
        })
    })

    describe('update note', () => {
        it('should succeed on correct data', () => {
            expect(_notes.length).toBe(0)

            logic.addNote('my note')

            expect(_notes.length).toBe(1)

            const [{ id }] = _notes

            logic.updateNote(id, 'my new note')

            expect(_notes.length).toBe(1)

            const [note] = _notes

            expect(note.id).toBe(id)
            expect(note.text).toBe('my new note')
        })

        it('should throw error on no id', () => {
            expect(() => logic.updateNote()).toThrowError('id is not a string')
        })

        it('should throw error on empty id', () => {
            expect(() => logic.updateNote('')).toThrowError('id is empty or blank')
        })

        it('should throw error on blank id', () => {
            expect(() => logic.updateNote('             ')).toThrowError('id is empty or blank')
        })

        it('should throw error on wrong id', () => {
            const id = 'non-existing-note-id'

            expect(() => logic.updateNote(id, 'text')).toThrowError(`note with id ${id} does not exist`)
        })

        it('should throw error on no text', () => {
            expect(() => logic.updateNote('123')).toThrowError('text is not a string')
        })

        it('should throw error on empty text', () => {
            expect(() => logic.updateNote('123', '')).toThrowError('text is empty or blank')
        })

        it('should throw error on blank text', () => {
            expect(() => logic.updateNote('123', '   ')).toThrowError('text is empty or blank')
        })
    })

    describe('search notes', () => {
        it('should return results on matching text', () => {
            expect(_notes.length).toBe(0)

            const id1 = logic.addNote('my note 1')
            const id2 = logic.addNote('my note 11')
            const id3 = logic.addNote('my note 111')

            const res = logic.findNotes('11')

            expect(res).toBeDefined()
            expect(res.length).toBe(2)

            const [note1, note2] = res
            
            expect(note1).toBeDefined()
            expect(note1.id).toBe(id2)
            expect(note1.text).toBe('my note 11')

            expect(note2).toBeDefined()
            expect(note2.id).toBe(id3)
            expect(note2.text).toBe('my note 111')
        })
    })
})

