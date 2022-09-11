// Necessary Modules and variables: express, mongo, port
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config();

// Variables to store the database name 
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'game-of-thrones-quotes';

// Connecting to MongoAtlas
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName)
    })
    .catch(err => {
        console.error(err)
    })
    
// Setting up ejs, and express' body parser alternative
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// Get request using template engine, ejs
app.get('/', (request, response) => {
    db.collection('quotes').find().toArray()
        .then(result => {
            response.render('index.ejs', { quotes: result })
        })
        .catch(err => {
            console.log(err);
        })
})

// Post request from the form to add quotes to dbCollection
app.post('/quotes', (request, response) => {
    db.collection('quotes').insertOne(request.body)
        .then(result => {
            console.log('Quote Added Successfully!');
            response.redirect('/');
        })
        .catch(err => {
            console.log(err)
        })
})

// Delete request to remove quotes from the db collection
app.delete('/deleteQuote', (request, response) => {
    db.collection('quotes').deleteOne(
        {originator: request.body.originatorS}
        )
        .then(result => {
            console.log('Quote Deleted')
            response.json('Quote deleted')
            // console.log(result);
        })
        .catch(err => {
            console.log(err)
        })
})

// Put request to change documents within the dbCollection
app.put('/updateQuote', (request, response) => {
    db.collection('quotes').updateOne(
        {
            originator: request.body.originatorS
        },
        {
            $set: {
                quote: request.body.quoteU
            }
        },
        {
            upsert: true
        }
        )
        .then(result => {
            console.log('Quote Updated')
            response.json('Quote Updated successfully')
        })
})

app.put('/updateOriginator', (request, response) => {
    db.collection('quotes').updateOne(
        {
            originator: request.body.originatorS
        },
        {
            $set: {
                originator: request.body.originatorU
            }
        },
        {
            upsert: true
        }
        )
        .then(result => {
            console.log('Originator updated')
            response.json('Originator updated successfully')
        })
})

// Server ear set-up
app.listen(8000, _ => {
    console.log(`I'm listening on PORT ${PORT}, what do you have to say?`)
})