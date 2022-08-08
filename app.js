const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()
const PORT = process.env.PORT || 3000

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Body-Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
  secret: 'keyboard mouse',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Global Var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

// PORT Connection
app.listen(PORT, ()=>{
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})