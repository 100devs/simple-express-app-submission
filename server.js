const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Collection } = require('mongodb')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let dbConnectionString = process.env.DB_STRING

MongoClient.connect(dbConnectionString)
.then(client => {
    console.log('Connected to Database')
    const db = client.db('caloriesCounter')
    const quotesCollection = db.collection('foodCaloriesList')
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.get('/',(req,res) => {
        quotesCollection.find().toArray()
        .then(results => {
            let total = results.reduce((pv, cv) => +cv.calories + +pv, 0)
            res.render('index.ejs', {quotes: results, total: total })
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
            { name: 'Yoda' },
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
        quotesCollection.deleteMany({ })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No input to delete')
            }
            res.json(`Deleted all past inputs`)
        })
        .catch(error => console.error(error))
    })

    app.listen(process.env.PORT || 3000,() => {
        console.log('listening on 3000')
    })

})
.catch(error => console.error(error))