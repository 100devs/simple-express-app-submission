const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const cors = require('cors')


app.use(cors())

let connectionString = process.env.DB_STRING

MongoClient.connect(connectionString, { useUnifiedTopology: true })
     .then(client => {
        console.log('Connected to Database')
        const db = client.db('quotes')
        const quotesCollection = db.collection('the-wire')

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))
        
        app.get('/', (request, response) => {
            response.sendFile(__dirname + '/index.html')
        }) 

        app.get('/', (req, res) => {
            quotesCollection.find().toArray()
            .then(results => {
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
        app.put('/quotes', (req,res) => {
            quotesCollection.findOneAndUpdate(
                {name: 'Bubbles'},
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
        app.delete('/quotes', (req,res) => {
            quotesCollection.deleteOne(
                {name: req.body.name}
              )
              .then(result => {
                  if (result.deletedCount === 0){
                      return res.json('No quote to delete')
                  }
                  res.json('Respect for Reginald')
              })
              .catch(error => console.error(error))
        })
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
     })
     .catch(error => console.error(error))
   
