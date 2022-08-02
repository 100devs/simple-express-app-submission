const express = require('express');
const app = express();
const port =  8000;
//this variable lets you bring in the connection function from the db file
const connectDB = require('./db');
//used to validate user access via cookie token
const cookieParser = require("cookie-parser");
//middleware auth,
const {adminAuth, userAuth} = require('./middleware/auth');
//ejs
app.set("view engine", "ejs")
app.use(express.static('public'))

connectDB();
app.use(cookieParser());
app.use(express.json());
//if the server receives a request to api/auth, it will then route the 
//request to our middleware in auth/route
app.use('/api/auth', require('./Auth/Route'));
app.use('/api/pets', require('./petRoutes/Route'));

app.get('/', (req, res) => res.render("home"));
app.get('/register', (req, res) => res.render("register"));
app.get('/login', (req, res) => res.render("login"));
app.get('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: '1'})//clears the token and expires it
    res.redirect('/') //redirects to home page
})

app.get("/petspage", userAuth, (req, res) => res.render("petspage"));
app.get("/petinfosubmit", userAuth, (req,res) => res.render("petinfosubmit"));
app.get("/getmetrics", userAuth, (req,res) => res.render("getmetrics"));

const server = app.listen(process.env.PORT || port, () => console.log(`Server connected to port`));

process.on('unhandledRejection', err => {
    console.log(`An error occured: ${err.message}`);
    server.close(() => process.exit(1))
})
