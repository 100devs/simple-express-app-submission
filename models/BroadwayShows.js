const mongoose = require('mongoose')

const broadwaySchema = new mongoose.Schema({
    showName: {
        type: String,
        required: true,
    },
    dateSeen: {
        type: Date,
    },
    location: {
        type: String,
    },
})

module.exports = mongoose.model('broadway-log', broadwaySchema)