const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

// =====================
// Middlewares
// =====================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://first-crud-app:HyYHeuUVNE8uz@cluster0.agshq.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('star-wars-quotes');
        
        // =====================
        // Listen
        // =====================
        app.listen(3000, function() {
            console.log('listening on 3000');
        })

        // =====================
        // CRUD Handlers
        // =====================
        app.post('/quotes', (req, res) => {
            db.collection('quotes').insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.log(error))
        })
         
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
              .then(quotes => {
                res.render('index.ejs', { quotes: quotes })
              })
              .catch(error => console.log(error))
        })
        
        app.put('/quotes', (req,res) => {
            db.collection('quotes').findOneAndUpdate(
                {name: 'Yoda'},
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
            .then(result => {res.json('Success')})
            .catch(error => console.log(error))
        })

        app.delete('/quotes', (req, res) => {
            db.collection('quotes').deleteOne(
              { name: req.body.name }
            )
              .then(result => {
                if (result.deletedCount === 0) { 
                  return res.json('No quote to delete')
                }
                res.json('Deleted Darth Vadar\'s quote')
              })
              .catch(error => console.error(error))
          })
    })
    .catch(error => console.log(error))


