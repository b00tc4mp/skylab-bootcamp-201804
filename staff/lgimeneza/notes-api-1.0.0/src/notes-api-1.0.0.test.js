'use strict'

require('dotenv').config()

const { mongoose, models: { User, Note } } = require('notes-data')
const { expect } = require('chai')
const notesApi = require('./notes-api-1.0.0')
const _ = require('lodash')

const { env: { DB_URL, API_URL } } = process

notesApi.url = API_URL

describe('logic (notes api)', () => {
    const userData = { name: 'John', surname: 'Doe', email: 'jd@mail.com', password: '123' }
    const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', password: '456' }
    const dummyUserId = '123456781234567812345678'
    const dummyNoteId = '123456781234567812345678'
    const noteText = 'my note'
    const indexes = []

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        let count = 10 + Math.floor(Math.random() * 10)
        indexes.length = 0
        while (count--) indexes.push(count)

        return Promise.all([User.remove()/*, Note.deleteMany()*/])
    })

    describe('register user', () => {
        it('should succeed on correct dada', () =>
            notesApi.registerUser('John', 'Doe', 'jd@mail.com', '123')
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already registered user', () =>
            User.create(userData)
                .then(() => {
                    const { name, surname, email, password } = userData

                    return notesApi.registerUser(name, surname, email, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with email ${userData.email} already exists`)
                })
        )

        it('should fail on no user name', () =>
            notesApi.registerUser()
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            notesApi.registerUser('')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            notesApi.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            notesApi.registerUser(userData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            notesApi.registerUser(userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            notesApi.registerUser(userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user email', () =>
            notesApi.registerUser(userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            notesApi.registerUser(userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            notesApi.registerUser(userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            notesApi.registerUser(userData.name, userData.surname, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            notesApi.registerUser(userData.name, userData.surname, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            notesApi.registerUser(userData.name, userData.surname, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(() =>
                    notesApi.authenticateUser('jd@mail.com', '123')
                        .then(id => expect(id).to.exist)
                )
        )

        it('should fail on no user email', () =>
            notesApi.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            notesApi.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            notesApi.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            notesApi.authenticateUser(userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            notesApi.authenticateUser(userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            notesApi.authenticateUser(userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return notesApi.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, surname, email, _id, password, notes } = user

                    expect(name).to.equal('John')
                    expect(surname).to.equal('Doe')
                    expect(email).to.equal('jd@mail.com')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(notes).to.be.undefined
                })
        )

        it('should fail on no user id', () =>
            notesApi.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )
    })

    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return notesApi.updateUser(id, 'Jack', 'Wayne', 'jd@mail.com', '123', 'jw@mail.com', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            const { name, surname, email, password } = user

                            expect(user.id).to.equal(id)
                            expect(name).to.equal('Jack')
                            expect(surname).to.equal('Wayne')
                            expect(email).to.equal('jw@mail.com')
                            expect(password).to.equal('456')
                        })
                })
        )

        it('should fail on changing email to an already existing user\'s email', () =>
            Promise.all([
                User.create(userData),
                User.create(otherUserData)
            ])
                .then(([{ id: id1 }, { id: id2 }]) => {
                    const { name, surname, email, password } = userData

                    return notesApi.updateUser(id1, name, surname, email, password, otherUserData.email)
                })
                .catch(({ message }) => expect(message).to.equal(`user with email ${otherUserData.email} already exists`))
        )

        it('should fail on no user id', () =>
            notesApi.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user name', () =>
            notesApi.updateUser(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            notesApi.updateUser(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            notesApi.updateUser(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            notesApi.updateUser(dummyUserId, userData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            notesApi.updateUser(dummyUserId, userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            notesApi.updateUser(dummyUserId, userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user email', () =>
            notesApi.updateUser(dummyUserId, userData.name, userData.surname)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            notesApi.updateUser(dummyUserId, userData.name, userData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            notesApi.updateUser(dummyUserId, userData.name, userData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            notesApi.updateUser(dummyUserId, userData.name, userData.surname, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            notesApi.updateUser(dummyUserId, userData.name, userData.surname, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            notesApi.updateUser(dummyUserId, userData.name, userData.surname, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return notesApi.unregisterUser(id, "jd@mail.com", '123')
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )

        false && it('should fail on no user id', () =>
            notesApi.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        false && it('should fail on empty user id', () =>
            notesApi.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        false && it('should fail on blank user id', () =>
            notesApi.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        false && it('should fail on no user email', () =>
            notesApi.unregisterUser(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        false && it('should fail on empty user email', () =>
            notesApi.unregisterUser(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        false && it('should fail on blank user email', () =>
            notesApi.unregisterUser(dummyUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        false && it('should fail on no user password', () =>
            notesApi.unregisterUser(dummyUserId, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        false && it('should fail on empty user password', () =>
            notesApi.unregisterUser(dummyUserId, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        false && it('should fail on blank user password', () =>
            notesApi.unregisterUser(dummyUserId, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })


    describe('add note', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    return notesApi.addNote(id, noteText)
                        .then(noteId => {

                            expect(noteId).to.be.a('string')
                            expect(noteId).to.exist

                            return User.findById(id)
                                .then(user => {
                                    expect(user).to.exist

                                    expect(user.notes).to.exist
                                    expect(user.notes.length).to.equal(1)

                                    const [{ id, text }] = user.notes

                                    expect(id).to.equal(noteId)
                                    expect(text).to.equal(noteText)
                                })
                        })
                })
        )

        it('should fail on wrong user id', () => {
            return notesApi.addNote(dummyUserId, noteText)
                .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
        })

        it('should fail on no user id', () =>
            notesApi.addNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.addNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.addNote('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no text', () => {
            notesApi.addNote(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('text is not a string'))
        })

        it('should fail on empty text', () =>
            notesApi.addNote(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
        )

        it('should fail on blank text', () =>
            notesApi.addNote(dummyUserId, '   ')
                .catch(({ message }) => expect(message).to.equal('text is empty or blank'))
        )
    })

    describe('retrieve note', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId, notes: [{ id: noteId }] }) => {
                    return notesApi.retrieveNote(userId, noteId)
                })
                .then(({ id, text }) => {
                    expect(id).to.equal(note.id)
                    expect(text).to.equal(note.text)
                })
        })

        it('should fail on non user id', () =>
            notesApi.retrieveNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.retrieveNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.retrieveNote('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on wrong user id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ notes: [{ id: noteId }] }) => {
                    return notesApi.retrieveNote(dummyUserId, noteId)
                        .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
                })
        })

        it('should fail on no note id', () =>
            notesApi.retrieveNote(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('note id is not a string'))
        )

        it('should fail on empty note id', () =>
            notesApi.retrieveNote(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on blank note id', () =>
            notesApi.retrieveNote(dummyUserId, '       ')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on wrong note id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId }) => {
                    return notesApi.retrieveNote(userId, dummyNoteId)
                        .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
                })
        })
    })

    describe('list notes', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)

            const notes = indexes.map(index => new Note({ text: `${noteText} ${index}` }))

            user.notes = notes

            return user.save()
                .then(({ id: userId, notes }) => {
                    // const validNoteIds = []
                    // const validNoteTexts = []

                    // notes.forEach(({ id, text }) => {
                    //     validNoteIds.push(id)
                    //     validNoteTexts.push(text)
                    // })
                    // or
                    const validNoteIds = _.map(notes, 'id')
                    const validNoteTexts = _.map(notes, 'text')

                    return notesApi.listNotes(userId)
                        .then(notes => {
                            expect(notes).to.exist
                            expect(notes.length).to.equal(indexes.length)

                            notes.forEach(({ id, text, _id }) => {
                                // expect(validNoteIds.includes(id)).to.be.true
                                // expect(validNoteTexts.includes(text)).to.be.true
                                // or
                                expect(validNoteIds).to.include(id)
                                expect(validNoteTexts).to.include(text)
                                expect(_id).not.to.exist
                            })
                        })
                })
        })

        it('should fail on non user id', () =>
            notesApi.listNotes()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.listNotes('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.listNotes('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )
    })

    describe('update note', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id: userId }) =>
                    User.findByIdAndUpdate(userId, { $push: { notes: { text: noteText } } }, { new: true })
                        .then(user => {
                            const noteId = user.notes[user.notes.length - 1].id

                            const newNoteText = `${noteText} 2`

                            return notesApi.updateNote(userId, noteId, newNoteText)
                                .then(res => {
                                    expect(res).to.be.true

                                    return User.findById(userId)
                                })
                                .then(({ notes }) => {
                                    const [{ id, text }] = notes

                                    expect(id).to.equal(noteId)
                                    expect(text).to.equal(newNoteText)
                                })
                        })
                )
        )

        it('should fail on non user id', () =>
            notesApi.updateNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.updateNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.updateNote('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on wrong user id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ notes: [{ id: noteId }] }) => {
                    return notesApi.updateNote(dummyUserId, noteId, `${noteText} 2`)
                        .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
                })
        })

        it('should fail on wrong note id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId }) => {
                    return notesApi.updateNote(userId, dummyNoteId, `${noteText} 2`)
                        .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
                })
        })
    })

    describe('remove note', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId, notes: [{ id: noteId }] }) => {
                    return notesApi.removeNote(userId, noteId)
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(userId)
                        })
                        .then(({ notes }) => {
                            expect(notes).to.exist
                            expect(notes.length).to.equal(0)
                        })
                })
        })

        it('should fail on non user id', () =>
            notesApi.removeNote()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.removeNote('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.removeNote('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on wrong user id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ notes: [{ id: noteId }] }) => {
                    return notesApi.removeNote(dummyUserId, noteId)
                        .catch(({ message }) => expect(message).to.equal(`no user found with id ${dummyUserId}`))
                })
        })

        it('should fail on no note id', () =>
            notesApi.removeNote(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('note id is not a string'))
        )

        it('should fail on empty note id', () =>
            notesApi.removeNote(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on blank note id', () =>
            notesApi.removeNote(dummyUserId, '       ')
                .catch(({ message }) => expect(message).to.equal('note id is empty or blank'))
        )

        it('should fail on wrong note id', () => {
            const user = new User(userData)
            const note = new Note({ text: noteText })

            user.notes.push(note)

            return user.save()
                .then(({ id: userId }) => {
                    return notesApi.removeNote(userId, dummyNoteId)
                        .catch(({ message }) => expect(message).to.equal(`no note found with id ${dummyNoteId}`))
                })
        })
    })

    describe('find notes', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData)

            user.notes.push(new Note({ text: `${noteText} a` }))
            user.notes.push(new Note({ text: `${noteText} ab` }))
            user.notes.push(new Note({ text: `${noteText} abc` }))
            user.notes.push(new Note({ text: `${noteText} bc` }))
            user.notes.push(new Note({ text: `${noteText} c` }))

            const text = 'ab'

            return user.save()
                .then(({ id: userId, notes }) => {
                    const matchingNotes = notes.filter(note => note.text.includes(text))

                    const validNoteIds = _.map(matchingNotes, 'id')
                    const validNoteTexts = _.map(matchingNotes, 'text')

                    return notesApi.findNotes(userId, text)
                        .then(notes => {
                            expect(notes).to.exist
                            expect(notes.length).to.equal(matchingNotes.length)

                            notes.forEach(({ id, text, _id }) => {
                                // expect(validNoteIds.includes(id)).to.be.true
                                // expect(validNoteTexts.includes(text)).to.be.true
                                // or
                                expect(validNoteIds).to.include(id)
                                expect(validNoteTexts).to.include(text)
                                expect(_id).not.to.exist
                            })
                        })
                })
        })

        it('should fail on non user id', () =>
            notesApi.findNotes()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            notesApi.findNotes('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            notesApi.findNotes('      ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no text', () =>
            notesApi.findNotes(dummyUserId)
                .catch(({ message }) => expect(message).to.equal('text is not a string'))
        )

        it('should fail on empty text', () =>
            notesApi.findNotes(dummyUserId, '')
                .catch(({ message }) => expect(message).to.equal('text is empty'))
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})