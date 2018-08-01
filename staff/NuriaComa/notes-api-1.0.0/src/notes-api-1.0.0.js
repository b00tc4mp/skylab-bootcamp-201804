'use strict'

const axios = require('axios')


const notesApi = {
    url: 'nowhere',

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')

                if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/users`, { name, surname, email, password })
                    //.then(({ status, data }) => status === 201 && data.status === 'OK')
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/auth`, { email, password })
                    //.then(({ data: { data: { id } } }) => id)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data.id
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return axios.get(`${this.url}/users/${id}`)
                    //.then(({ data: { data: user } }) => user)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },
    updateUser(id, name, surname, email, password,newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')

                if (!(surname= surname.trim())) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if ((email = email.trim()).length === 0) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')
                
                if (typeof newEmail !== 'string') throw Error('user newEmail is not a string')

                if ((newEmail = newEmail.trim()).length === 0) throw Error('user newEmail is empty or blank')

                return axios.patch(`${this.url}/users/${id}`,{ name, surname, email, password, newEmail, newPassword})
                    
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if ((email = email.trim()).length === 0) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')
                
               
                return axios.delete(`${this.url}/users/${id}`,{data: {email, password}})
                    
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },
    addNote(userId, text) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')
 
               
                return axios.post(`${this.url}/users/${userId}/notes`, {text})
                    
                    .then(({ status, data }) => {
                        
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        
                        return data.data.id
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },
    retrieveNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof noteId !== 'string') throw Error('note id is not a string')

                if ((noteId = noteId.trim()).length === 0) throw Error('note id is empty or blank')
 
               
                return axios.get(`${this.url}/users/${userId}/notes/${noteId}`)
                    
                    .then(({ status, data }) => {
                        
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

    
                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    listNotes(userId) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

               
               
                return axios.get(`${this.url}/users/${userId}/notes`)
                    
                    .then(({ status, data }) => {
                        
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        
                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },
    updateNote(userId, noteId, text) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof noteId !== 'string') throw Error('note id is not a string')

                if ((noteId = noteId.trim()).length === 0) throw Error('note id is empty or blank')
                
                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')
               
                return axios.patch(`${this.url}/users/${userId}/notes/${noteId}`, {text})
                    
                    .then(({ status, data }) => {
                        
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        
                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    removeNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

               
               
                return axios.delete(`${this.url}/users/${userId}/notes/${noteId}`)
                    
                    .then(({ status, data }) => {
                        
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        
                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    findNotes(userId, text) {
        return Promise.resolve()
            .then(() => {
                
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')
                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty')
               
               
                return axios.get(`${this.url}/users/${userId}/notes?q=${text}`)
                    
                    .then(({ status, data }) => {
                        
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        
                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    }
}

module.exports = notesApi


