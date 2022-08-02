const Medication = require('./Medication').schema;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String,
  },
  password: String,
  medications: {
    type: [Medication],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;