const mongoose = require('mongoose'); 

const recipeListSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    servings: {
        type: String
    },
    prepTime: { 
        type: String
    },
    cookTime: { 
        type: String
    },
    totalTime: { 
        type: String
    },
    ingredients: [{
        type: String,
        required: true
    }],
    directions: [{
        type: String,
        required: true
    }],
    specialNotes: {
        type: String
    }
});

module.exports = mongoose.model('Recipe', recipeListSchema, 'recipes'); 