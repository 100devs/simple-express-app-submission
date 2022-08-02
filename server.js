const express = require('express')
const methodOverride = require('method-override');
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
require('dotenv').config()

const connectionString = process.env.MONGODB_URL
const browserRoutes = require('./routes/browser-routes')
const apiRoutes = require('./routes/api-routes')

// ========================
// Middlewares 
// ========================
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true }))
    app.use(methodOverride(function (req,res){
        if (req.body && typeof req.body === 'object' && '_method' in req.body){
            let method = req.body._method
            delete req.body._method
            return method
        }
    }))
    app.use(express.json())
    app.use(express.static('public'))

// ========================
// Routes
// ========================

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*', );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
});

app.use('/', browserRoutes);
app.use('/api', apiRoutes);

app.use((req, res, next) => {
    const error = new Error('Could not find this route');
    throw error
});

app.use((error, req, res, next) => {
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred.'});
});

// ========================
// Server
// ========================
mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to Corporate Speech database')
        app.listen(process.env.PORT || PORT, () =>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err);
    });
    

