const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  name: {
    type: String,
    required: true,
  },
  count: Number,
  type: String,
  dose: String,
  timesPerDay: {
    type: Number,
    required: true,
  },
  days: [String],
  time: String,
  administered: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;