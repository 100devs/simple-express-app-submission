const Mongoose = require("mongoose")
const UserPlant = require('./userPlant')
const User = require('./user')

const NoteSchema = new Mongoose.Schema({
    plant : {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user-plants'
    },
    user : {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    body : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now,
        required: true
    }
})

const Note = Mongoose.model('Note', NoteSchema, 'notes')
module.exports = Note