const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    pictures: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    comments: {
        type: [{
            comment: {
                type: String,
            },
            poster: {
                type: String,
            },
            date: {
                type: String,
                default: new Date().toISOString().split('T')[0],
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        }],
        default: []
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },
    likes: [],
    dislikes: []
},{minimize: false, timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe