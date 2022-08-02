const Mongoose = require("mongoose");
require('dotenv').config()

const uri = process.env.RemoteDB;

const connectDB = async () => {
    await Mongoose.connect(uri)
    .then(client => {
        console.log("MongoDB Connection Successful")
    })
}

module.exports = connectDB
