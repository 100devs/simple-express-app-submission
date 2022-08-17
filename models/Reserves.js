const mongoose = require('mongoose');
const reservesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currentLevel: {
    type: Number,
    required: true,
  },
  boxNumber: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Reserves', reservesSchema, 'storage');