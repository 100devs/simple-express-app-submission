const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: String,
  content: String
}, {
  timestamps: true
});


module.exports = mongoose.model('Note', NoteSchema);


// const BoxSchema = mongoose.Schema({
//   boxName: String,
//   boxItems: [NoteSchema]
// })

// module.exports = mongoose.model('Box', BoxSchema);