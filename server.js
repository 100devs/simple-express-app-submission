const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })

//MIDDLEWARE
app.set('view engine', 'ejs') 
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json()) //json use parse the json being sent back and forth
app.use(cors())

app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})


//PORT = 8000
app.listen(process.env.PORT || PORT, () => {  //if 8000 isn't available for Heroku, PORT, () lets Heroku decide where to go.
    console.log(`Server is running on port = ${PORT}`)
})