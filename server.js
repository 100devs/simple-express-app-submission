const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'star-wars-quotes',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to database')
        db = client.db(dbName)
        collection = db.collection('quotes')
    })


app.set('view engine', 'ejs')
// templating! Allows us to take in data dynamically and pass it as html.


app.use(express.static('public'))
// setting up a folder to hold our css, main.js to serve up external files


app.use(express.urlencoded({extended: true}))
// helps to parse urls


app.use(express.json())
// helps express understand the json being passed


app.use(cors())
// allows cross-origin requests


// To send ejs file when a user goes to home address:
app.get('/', async (req, res) => {
    try {
        res.render('index.ejs')
    }
    catch (error) {
        res.status(500).send({message: error.message})
    }
})

// pulls port # out of env file OR let host choose port
// the function indicates as soon as the connection is running, run that function
app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on port')
})