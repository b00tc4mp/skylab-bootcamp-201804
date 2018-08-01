const expect = require('expect')
const logic = require('./logic')

describe('notes (logic)', () => {
    beforeEach(() => logic._notes.length = 0)

    it('should add note', () => {
        logic.addNote('my note')

        expect(logic._notes.length).toBe(1)

        const [note] = logic._notes

        expect(note.text).toBe('my note')
        expect(note.id).toBeDefined()
    })

    it('should list notes', () => {
        logic.addNote('my note 1')
        logic.addNote('my note 2')
        
        const notes = logic.listNotes()

        expect(notes.length).toBe(2)
    })

    it('should remove a note', () => {
        logic.addNote('my note')

        expect(logic._notes.length).toBe(1)

        const [note] = logic._notes

        logic.removeNote(note.id)

        expect(logic._notes.length).toBe(0)

        expect(() => logic.removeNote(note.id)).toThrow(Error('Id not found'))
    })
})

