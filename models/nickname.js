const mongoose = require('mongoose')
const nicknameSchema = new mongoose.Schema({
    source: {
        type: String,
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Nickname', nicknameSchema, 'nicknames')