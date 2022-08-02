const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    eventName:{
        type: String
    },
    date:{
        type: Date
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    companyPosition:{
        type: String
    },
    spark:{
        type: String
    },
    email:{
        type: String
    },
    followUp:{
        type: Date
    },
    addLinkedIn:{
        //type: String,
        //enum: ["Yes", "No"]
        type: Boolean,
        default: false
    },
    twitter:{
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)