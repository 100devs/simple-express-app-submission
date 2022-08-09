const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'encouragement'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect(dbConnectionStr, {
    useUnifiedTopology: true
  })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        const wordsCollection = db.collection('words')
        app.use(bodyParser.urlencoded({ extended: true}))
        app.get('/', (req, res) => {
            db.collection('words').find().sort({loves: -1}).toArray()
                .then(results => {
                    res.render('index.ejs', { words: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/addEncouragement', (req, res) => {
            wordsCollection.insertOne({words: req.body.words, loves: 0})
                .then(result => {
                    console.log('Encouragement Contributed')
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/addOneLove', (req, res) => {
            console.log(req.body)
            db.collection('words').updateOne({words: req.body.wordsS, loves: req.body.lovesS},{
                $set: {
                    loves: req.body.lovesS + 1
                  }
            },{
                sort: {_id: -1},
                upsert: true
            })
            .then(result => {
                console.log('Added One Love')
                res.json('Love Added')
            })
            .catch(error => console.error(error))
        
        })

        app.delete('/deleteEncouragement', (req, res) => {
            db.collection('words').deleteOne({words: req.body.wordsS, loves: req.body.lovesS})
            .then(result => {
                console.log('Encouragement Deleted')
                res.json('Encouragement Deleted')
            })
            .catch(error => console.error(error))
        
        })
        
        app.listen(process.env.PORT || PORT, function() {
            console.log(`listening on ${PORT}`)
        })
     })
     .catch(error => console.error(error))