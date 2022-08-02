const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    genre: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }]
})

BookSchema
    .virtual('url')
    .get(function() {
        return `/catalog/book/${this._id}`
    });

//Eport model
module.exports = mongoose.model('Book', BookSchema);