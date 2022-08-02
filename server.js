require('dotenv').config() //as early as possible
console.log('my rocket')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser') // read values from form
const ejs = require('ejs')
const app = express()
const PORT = process.env.PORT || 3000


let dbConnector = process.env.DB_URI
let dbase = 'book-saver db'

MongoClient.connect(dbConnector, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log(`connected to ${dbase}`);
        const db = client.db('book-saver')

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            db.collection('books').find().toArray()
                .then(result => {
                    res.render('index.ejs', {
                        books: result
                    })
                })
                .catch(err => console.error(err))
        })

        app.post("/books", (req, res) => {
            if (!req.body.title && !req.body.author) {
                res.redirect('/')
                return
            } else {
                db.collection('books').insertOne({
                        title: req.body.title,
                        author: req.body.author,
                        read: req.body.read
                    })
                    .then(result => {
                        res.redirect('/')
                        console.log(req.body.read)

                    })
                    .catch(err => console.error(err))
            }
        });



        app.put('/updateBookStatus', (req, res) => {

            let nor;
            if (req.body.read === 'Read') {
                nor = 'Not read'
            } else {
                nor = 'Read'
            }

            db.collection('books')
                .updateOne({
                    title: req.body.title,
                    author: req.body.author,
                    read: req.body.read
                }, {
                    $set: {
                        read: `${nor}`
                    }
                }, {
                    upsert: false
                })
                .then(result => {

                    res.json(req.body.read)


                })
                .catch(err => console.error(err))
        })

        app.delete('/deleteBooks', (req, res) => {
            // Handle delete event here
            db.collection('books').deleteOne({
                    title: req.body.title
                })
                .then(result => {
                    res.json(`Book Deleted`)
                })
                .catch(error => console.error(error))
        })

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}!`)
        })

    })
    .catch(err => console.error(err))