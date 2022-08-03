const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: "This field is required."
    },
    phone_number: {
        type: String, 
        required: "This field is required."
    },
    email: {
        type: String,
        required:"This field is required."
    },
    date: {
        type: Date, 
        default: Date.now
    },
    room_number: {
        type: String,
        required: "This field is required.",
        unique: true
    }
    
})

guestSchema.index({name:'text', phone_number:'text'})

module.exports = mongoose.model('Guest', guestSchema);