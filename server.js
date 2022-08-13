console.log('May Node be with you.')

require('dotenv').config()
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

const PORT = 3000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'body+media'


//go go gadget ejs for some custom-rendered html
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


//wrap in mongodb client

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        
        //identify db
        db = client.db(dbName)
    })

//activate extensions
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())

// Update an entry by liking it
app.put('/like', (req, res) => {
    db.collection('media').updateOne(
        { title: req.body.titleFromJS },
        { $set: {
            likes: req.body.likesFromJS
        }},
        {   sort: { _id: -1},
            upsert: false }
    )
    .then(result => {
        console.log('New like processed')
        res.json('Success! Thank you for your input.')
    })
    .catch(error => console.error(error))
})

//display a list of all entries
app.get('/', (req, res) => {
    db.collection('media').find().toArray()
    .then(results => {
        res.render('index.ejs', { media: results })
    })
    .catch(error => console.error(error))
})

//add a new entry
app.post('/addMedia', (req, res) => {
    db.collection('media').insertOne({
        title: req.body.title, 
        type: req.body.type, 
        likes: 0
    })
    .then(result => {
        console.log('New entry added!')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

//delete an entry
app.delete('/deleteMedia', (req, res) => {
    db.collection('media').deleteOne({title: req.body.titleFromJS})
    .then(result => {
        console.log('Entry Deleted')
        res.json('Entry Deleted')
    })
    .catch(error => console.error(error))
    })

// express listening
app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})
