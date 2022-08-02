const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient // The .MongoClient allows us to use the methods associated with mongoclient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING, // Recommend this to be const instead so we get runtime errors if it's ever reassigned
    dbName = 'star-trek-api',
    collection


MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to database')
        db = client.db(dbName)
        collection = db.collection('alien-info')
    })

// Step 6
app.set('view engine', 'ejs') // initializes and sets view engine to be ejs
// app.set('views', './public/views') tells express where all views are..looks cleaner?
app.use(express.static('public')) // let's the app automatically serve files in public as they are called upon (serving all the files from public if anyone access them under the base / path)
app.use(express.urlencoded({extended: true})) // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.json()) // helps express parse json, pull it apart and extract data out of it. Allows us to read data passed back and forth
app.use(cors()) // allows cross-origin requests and stops cors errors in browser


//The CRUD stuff goes here
app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch(error) {
        response.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running on port = ${process.env.PORT}`)
})
