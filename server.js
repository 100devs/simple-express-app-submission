const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient 
const PORT = 8000
require('dotenv').config()

app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public/'))
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Coffee'

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to ${dbName} Database')
            db = client.db(dbName)
        })


    app.get('/', (request, response) => {
        db.collection('coffee').find({}).toArray()
        .then(data=> {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
    })    

    app.post('/addCoffee', (request, response) => {
    db.collection('coffee').insertOne({coffeeBrand: request.body.coffeeBrand, beanType: request.body.beanType, roastFlavor: request.body.roastFlavor})
        .then(result => {
            console.log('Coffee Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
    })










// run on remote or local environment
app.listen(process.env.PORT || PORT, () => {
    console.log('Server running on port ${PORT}')
})
