const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Link to Database
const dotenv = require('dotenv').config({
    path: './secrets/variables.env',
});
const connectionString = process.env.DB_URL;

// Connect with promises
MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to DB');
        const db = client.db('loiter-squad-quotes');
        const quotesCollection = db.collection('quotes');

        // Middlewares
        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static('public'));
        app.use(bodyParser.json());

        // Read
        app.get('/', (req, res) => {
            const cursor = db
                .collection('quotes')
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results });
                })
                .catch(error => console.error(err));
        });

        // Add
        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    res.redirect('/');
                })
                .catch(error => console.error(error));
        });

        // Update
        app.put('/quotes', (req, res) => {
            quotesCollection
                .findOneAndUpdate(
                    { name: 'Catchphrase Jones' },
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote,
                        },
                    },
                    {
                        upsert: true,
                    }
                )
                .then(result => {
                    res.json('Success');
                })
                .catch(error => console.error(error));
        });

        // Delete
        app.delete('/quotes', (req, res) => {
            quotesCollection
                .deleteOne({ name: req.body.name })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete');
                    }
                    res.json(`Deleted Thurnis Haley's quote`);
                })
                .catch(error => console.error(error));
        });

        app.listen(3000, function () {
            console.log('listening on 3000');
        });
    })
    .catch(error => console.log(error));
