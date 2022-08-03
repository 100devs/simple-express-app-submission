const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    note: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Note", noteSchema, 'testDatabase')