// Variables
const express = require("express")
const app = express()
const PORT = 1337
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const flash = require("express-flash")
const logger = require("morgan")
const moment = require("moment")
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const dashboardRoutes = require("./routes/dashboard")
const editRoutes = require("./routes/edit")
require("dotenv").config({ path: "./config/.env"})

// Passport
require("./config/passport")(passport)

connectDB()

// Set Middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger("dev"))

// Sessions
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Set Routes
app.use("/", mainRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/edit", editRoutes)

app.listen(process.env.PORT || PORT, ()=> console.log(`Server is running on port ${PORT}`))