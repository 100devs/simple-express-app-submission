//server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const connectionString = process.env.DB_STRING

MongoClient.connect(connectionString, {
    useUnifiedTopology: true })
    .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars')
    const quotesCollection = db.collection('quotes')
    
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.listen(3000, function() {
    console.log('listening on 3000')
    })
    })
    .catch(console.error)


// Make sure to place body-parser before your CRUD handlers!


console.log('May Node be with you')