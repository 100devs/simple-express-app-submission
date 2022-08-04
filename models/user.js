const Mongoose = require("mongoose")

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  locations: {
    type: Array,
    default: ["No location assigned"],
    required: true,
  },
})

const User = Mongoose.model('User', UserSchema, 'users')
module.exports = User
