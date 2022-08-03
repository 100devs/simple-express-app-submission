const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient
dotenv.config();
const app = express()

const connectionString = process.env.MONGODB_URL

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Successful database ocnnection. Ain\'t that swell?')
        const db = client.db('parks-n-rec-db')
        const quotesCollection = db.collection('quotes')

        // ========================
        // Middlewares
        // ========================
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        // ========================
        // Routes
        // ========================
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(quotes => {
                    res.render('index.ejs', { quotes: quotes })
                })
                .catch(error => console.error(error))
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
                { name: 'Leslie Knope', name: 'Ron Swanson', name: 'Tom Haverford', name:'Andy Dwyer', name: 'April Ludgate'},
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => res.json('Success'))
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json('Deleted Ron Swanson\'s quote')
                })
                .catch(error => console.error(error))
        })

        // ========================
        // PORT
        // ========================
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}, better go catch it...`);
        });
