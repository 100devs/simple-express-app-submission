// Variables
const express = require("express")
const app = express()
const PORT = 1337
const mongoose = require("mongoose")
const moment = require("moment")
const connectDB = require("./config/database")
const homeRoutes = require("./routes/home")
const editRoutes = require("./routes/edit")
// const DrivingHours = require("./models/hours")
require("dotenv").config({ path: "./config/.env"})

connectDB()

// Set Middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

// Set Routes
app.use("/", homeRoutes)
app.use("/edit", editRoutes)

app.listen(process.env.PORT || PORT, ()=> console.log(`Server is running on port ${PORT}`))