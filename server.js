//server.js
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const port = process.env.PORT || 3000;
require('dotenv').config()

let db,
    connectionString = process.env.DB_STRING,
    dbName = 'star-wars'

MongoClient.connect(connectionString, {
    useUnifiedTopology: true })
    .then(client => {
    console.log('Connected to Database')
    db = client.db(dbName)
    const quotesCollection = db.collection('quotes')
    
    //using ejs as the template engine to generate the html
    app.set('view engine', 'ejs')
    
    //express.urlencoded is apparently the more modern way instead of bodyparser.urlencoded
    app.use(express.urlencoded({ extended: true }));
    

    app.get('/', (req, res) => {
        //cursor would look like a jumble without .toArray()
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
            console.log(results)
        })
        .catch(error => console.log(error))
        res.render('index.ejs', {})
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.listen(port, function() {
    console.log(`listening on ${port}`)
    })
    })
    .catch(console.error)


// Make sure to place body-parser before your CRUD handlers!


console.log('May Node be with you')