const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("TodoTask", todoTaskSchema, "todo-list-tasks");
