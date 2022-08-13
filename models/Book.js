const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
  },
  quotes: {
    type: [String],
  },
  notes: {
    type: String,
  },
  cover: {
    type: String,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", BookSchema);
