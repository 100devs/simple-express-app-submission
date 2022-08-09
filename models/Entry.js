const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  mood: {
    type: String,
    default: 'moderate',
    enum: ['poor', 'moderate', 'excellent'],
    required: true
  },
  body: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Entry', EntrySchema)