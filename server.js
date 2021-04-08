//server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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
    app.use(express.static('public'))
    // Make sure to place body-parser before your CRUD handlers!
    app.use(bodyParser.json())


    app.get('/', (req, res) => {
        //cursor would look like a jumble without .toArray()
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
            console.log(results)
            res.render('index.ejs', { quotes: results })
          })
        .catch(error => console.log(error))

    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            //query
            { name: "Yoda" },
            //update
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            //options
            {
                // insert new document if no matching document exists (update/insert)
                upsert: true
            }
        )
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            // query - we don't need to hard code 'Darth Vadar', 'cause it's passed in from main.js in req
            { name: req.body.name }
            // options can be ommitted here
        )   
        .then(result => {
            if(result.deletedCount === 0){
                return res.json(`No quote to delete`)
            }
            res.json(`Deleted Darth Vadar's quote`)
        })
        .catch(error => console.error(error))
    })

    app.listen(port, function() {
        console.log(`listening on ${port}`)
        })
    })
    .catch(console.error)



console.log('May Node be with you')