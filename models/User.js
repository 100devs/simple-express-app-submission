const Mongoose = require('mongoose')

//schema = the structure of items in our db and their characteristics
const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true, 
    }, 
    password: {
        type: String, 
        minlength: 8, 
        required: true
    },
})

//use the schema to create a model 
const User = Mongoose.model('user', UserSchema)

module.exports = User