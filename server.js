const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
require('dotenv').config()
const PORT = 8000;

MongoClient.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('wow-boss-quotes')
        const quotesCollection = db.collection('quotes')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// CRUD
app.get('/', (req, res) => {
    quotesCollection.find().toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results})
        })
        .catch(error => console.error(error))
})

app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
            // console.log(result)
        })
        .catch(error => console.error(error))
})

app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
        {name: 'Edwin Van Cleef'}, 
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
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
})

app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
        {name: req.body.name},
    )
    .then(result => {
        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
        }
        res.json('Yogg-Saron has been weakened!')
    })
    .catch(error => console.error(error))
})

// LISTEN
app.listen(process.env.PORT || PORT, function() {
    console.log(`listening on port ${PORT}`)
})
      })
      .catch(error => console.error(error))



