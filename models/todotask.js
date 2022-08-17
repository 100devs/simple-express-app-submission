//create a template to set up our mongo documents for our database
const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
content: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now
}
})
module.exports = mongoose.model('TodoTask',todoTaskSchema,'things-todo');

//in order to export the above template/schema
//first export and name it, then pull the name of the scheme name, and then define which collection it's going to connect to on mongodb