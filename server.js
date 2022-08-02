console.log('May Node be with you')
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.connectionString

require('dotenv').config()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
     console.log('Connected to Database')
     const db = client.db('villager-quotes')
     const quotesCollection = db.collection('quotes')

     app.get('/', (req, res) => {
          quotesCollection.find().toArray()
               .then(results => {
                    console.log(results)
                    res.render('index.ejs', {quotes: results})
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
               { name: 'Isabelle'},
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
               console.log(result)
               res.json('Success')
          })
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
               res.json("Deleted Tom Nook\'s quote")
          })
          .catch(error => console.error(error))
     })
     app.listen(PORT, () => {
          console.log(`listening on port ${PORT}!`)
        })
})
.catch(error => console.error(error))
