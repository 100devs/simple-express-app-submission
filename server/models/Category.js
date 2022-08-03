const mongoose = require("mongoose");

//Create category schema

const categorySchema = new mongoose.Schema({
  // defines the structure of the doc and validation etc
  name: {
    type: String,
    required: "This field is required",
  },
  image: {
    type: String,
    required: "This field is required",
  },
});
//Export the model so it can be reused in other js files
module.exports = mongoose.model("Category", categorySchema); // interface to the db
