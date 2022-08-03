const mongoose = require("mongoose");

//Create category schema

const emotionSchema = new mongoose.Schema({
  // defines the structure of the doc and validation etc
  name: {
    type: String,
    required: "This field is required",
  },
  description: {
    type: String,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This field is required",
  },
  feelings: {
    type: Array,
    required: "This field is required",
  },
  category: {
    type: String,
    enum: ["Happy", "Sad", "Angry", "Confused", "Depressed", "Anxious"],
    required: "This field is required",
  },
  actions:{
    type: Array,
    required: "This field is required",
  },
  image: {
    type: String,
    required: "This field is required",
  },
});

emotionSchema.index({ name: "text", description: "text" }); /// index search
//Export the model so it can be reused in other js files
module.exports = mongoose.model("Emotion", emotionSchema); // interface to the db
