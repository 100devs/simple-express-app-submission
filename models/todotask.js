const mongoose = require('mongoose')

//build framework for documents in mongoDB
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

//export the model of the schema
module.exports = mongoose.model("TodoTask", todoTaskSchema, 'tasks')
