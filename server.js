// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://{username}:{password}@instbase.tmrqqa9.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('instBase')
        const instrumentation = db.collection('instrus')

        app.listen(3000, function() {
            console.log('listening on 3000')
        })
        
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.set('views', './views')
        app.set('view engine', 'ejs')
        app.get('/', function(req, res) {
            instrumentation.find().toArray()
               .then(results => {
               res.render('index.ejs', { instrumentation: results })
               })
            })

        app.get('/style.css', function(req, res) {
            res.sendFile(__dirname + '/style.css')
        })

        app.get('/actions.js', function(req, res) {
            res.sendFile(__dirname + '/actions.js')
        })
        
        app.post('/create', (req, res) => {
            instrumentation.insertOne(req.body)
                .then(result => {
                console.log(result)
                res.redirect('/')
                })
                .catch(error => console.error('error'))
        })

        app.put('/update', (req, res) => {
            instrumentation.findOneAndUpdate(
                { CalSticker : document.querySelector('#checkInCalStick') },
                {
                    $set: {
                        Loc : 'HomeBase',
                        Date : document.querySelector('#checkInDate')
                    }
                },
                options
            )
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))

        })
        
    })



