const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // connect to server
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("connected"); // test connection
});

// Models

require("./Category"); // import Category.js
require("./Emotion"); // import Emotion.js


