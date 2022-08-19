const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    item:{
        type : String,
        required : true
    },
    category :{
        type : String
    },
    quantity:{
        type : String
    },
    gotIt: String
})

const Itemdb = mongoose.model('itemdb', schema) 

module.exports = Itemdb;