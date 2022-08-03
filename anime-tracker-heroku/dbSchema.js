const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    title:{
        type: String
    },
    score:{
        type: Number
    },
    img:{
        type: String
    },
    ep:{
        type: Number
    },
    synopsis:{
        type: String
    },
    currentEp:{
        type: Number
    }
})

module.exports = mongoose.model('anime', animeSchema)