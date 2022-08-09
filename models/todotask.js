//This is wher eyou put the code that reaches out to the server to send information back and forth
//Info can travel back and forth using fetch
//Schema (outline/model)

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
module.exports = mongoose.model('TodoTask',todoTaskSchema,'tasks');