const mongoose = require('mongoose');
const starterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currentLevel: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Starters', starterSchema, 'startingFive');