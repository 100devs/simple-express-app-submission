const mongoose = require('mongoose')

const Schema = mongoose.Schema

const entrySchema = new Schema({
    original: { type: String, required: true, minlength: 6 },
    corporate: { type: String, required: true, minlength: 6 },
    category: { type: String, required: true, minlength: 4 },
});

module.exports = mongoose.model('Entry', entrySchema)