const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    def: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    }})

module.exports = mongoose.model('words', WordSchema)