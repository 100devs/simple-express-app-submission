console.log('May Node be With you')
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require ('mongodb').MongoClient
const connectionString = 'mongodb+srv://ana_url:idrW9Lu87P!Us9N@cluster0.swhx7ao.mongodb.net/?retryWrites=true&w=majority'

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

<<<<<<< HEAD
    app.put('/quotes', (req,res) =>  {
=======
      app.put('/quotes', (req,res) =>  {
>>>>>>> 64c9acddfbb328c1fad63e74278c50b948cb7af0
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

<<<<<<< HEAD
    app.delete('/quotes', (req, res) => {
=======
      app.delete('/quotes', (req, res) => {
>>>>>>> 64c9acddfbb328c1fad63e74278c50b948cb7af0
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




 


