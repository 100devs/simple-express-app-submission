const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  planet: {
    type: String,
    require: true,
    unique: false,
  },
});

const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
