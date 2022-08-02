const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('blog', blogSchema, 'entry');