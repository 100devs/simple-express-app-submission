// console.log('May Node be with you')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://fae:poi4puck@adventure-time-cluster.6ibiopy.mongodb.net/?retryWrites=true&w=majority'

// app.listen(3000, function() {
//     console.log('listening on 3000')
// })

// // body parser

// app.use(bodyParser.urlencoded({ extended: true }))

// // handlers

// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// app.post('/quotes', (req,res) => {
//     console.log(req.body)
// })

// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
//   })

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database')

    const db = client.db('adventure-time-quotes')

    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(express.static('public'))

    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/index.html')
        db.collection('quotes').find().toArray()
          .then(results => {
            res.render('index.ejs', { quotes: results })
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
          .then(result => res.json('Success'))
          .catch(error => console.error(error))
      })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
      .then((result) => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
    })

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne({ name: 'Ice King' }
        )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json(`Deleted Ice King's Quote`)
        })
        .catch(error => console.error(error))
    })

  })
  .catch((error) => console.error(error))
