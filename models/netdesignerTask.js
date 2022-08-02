const mongoose = require('mongoose')
const netdesignerTaskSchema = new mongoose.Schema({
    name:{
        type: String
        // required: true
    },
    issue: {
        type: String
        // required: true
    },
    wishes: {
        type: String
    },
    actionTaken: {
        type: String
    },
    solution: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
})
module.exports = mongoose.model('NetdesignerTask', netdesignerTaskSchema,'tasks')