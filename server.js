if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
require('./passport-config')

const connectDB = require('./db')
connectDB()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const dishesRouter = require('./routes/dishes')

app.set('view engine', 'ejs')  //Set up app to use EJS as the HTML templating language
app.set('layout', './layouts/layout')

app.use(express.static(path.join(__dirname, 'public'))) //Set up public folder to serve CSS, JS, and image files
app.use(express.urlencoded({ extended: true })) // Use Express' built-in middleware to parse incoming requests with urlencoded payloads 
app.use(express.json()) //Use Express' json parser middleware
app.use(expressLayouts)

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Lets you access currentUser in ejs files (to change the navbar links based on whether a user is signed in)
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//Middleware to override a link's GET method with DELETE 
//Must use the query parameter _method (e.g.: href="/logout?_method=DELETE")
app.use( function( req, res, next ) {
    // if _method is a query parameter...
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD into DELETE method 
        req.method = 'DELETE';
        // and set requested url to the path
        req.url = req.path;
    }       
    next(); 
});

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/dishes', dishesRouter)

//Set up the server to listen on our port (if it's defined in .env), or whatever the port is
app.listen(process.env.PORT || PORT, ()=>{
    //If successful, log message to console
    console.log(`Server running on port ${PORT}`)
})