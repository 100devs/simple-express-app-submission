console.log('May Node be With you')
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require ('mongodb').MongoClient
require('dotenv').config()

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('queer-feminist-quotes')
    const quotesCollection = db.collection('quotes')

    //Middlewares

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    //Routes 
    app.get('/', (req, res) => {
        quotesCollection.find().toArray() 
        .then(quotes => {
            console.log(quotes)
            res.render('index.ejs', {quotes: quotes})
        })
        .catch(error => console.error(error))
      })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))

      })

    app.put('/quotes', (req,res) =>  {
          quotesCollection.findOneAndUpdate (
              {name: 'Audre Lorde' },
              {
                  $set: { 
                      name: req.body.name,
                      quote: req.body.quote
                  }
              },
              {
                  upsert:true
              }
          )
          .then (result => res.json('Success'))
          .catch(error=> console.error(error))
      })

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json('Deleted Ana\'s quote')
          })
          .catch(error => console.error(error))
      })

      app.listen(3000, () => {
              console.log('listening on 3000');
          })
  })
  .catch(error=> console.error(error))




 


