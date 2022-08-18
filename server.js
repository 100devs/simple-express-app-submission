// Variables
const express = require("express")
const app = express()
const PORT = 1337
const mongoose = require("mongoose")
const connectDB = require("./config/database")
require("dotenv").config({ path: "./config/.env"})

// Model Variable

// Middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

connectDB()

app.listen(process.env.PORT || PORT, ()=> console.log(`Server is running on port ${PORT}`))