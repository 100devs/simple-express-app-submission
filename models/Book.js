import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  book: {
    type: Object,
    required: true
  },
  notes: {
    type: String,
  }
})

export default mongoose.models.Book || mongoose.model("Book", bookSchema);