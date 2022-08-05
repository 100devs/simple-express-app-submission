const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()
//connect to database

let db
let dbConnectionStr = process.env.DB_STRING
let dbName = 'vocab-app'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName}`)
        db = client.db(dbName)
    })


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/',async (req, res) => {
    const vocabWords = await db.collection('words').find().sort({'difficulty': -1, 'word': 1}).toArray()
    res.render('index.ejs', {words: vocabWords})
})

app.post('/addWord', (req, res) => {
    db.collection('words').insertOne({word: req.body.word, def: req.body.defintion, difficulty: 'easy'})
    .then(result => {
        console.log('word added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.put('/setHard', (req, res) => {
    db.collection('words').updateOne({word: req.body.change},{
        $set: {
            difficulty: 'hard'
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('set to hard')
        res.json('set to hard')
    })
    .catch(err => console.error(err))
})

app.put('/setEasy', (req, res) => {
    db.collection('words').updateOne({word: req.body.change},{
        $set: {
            difficulty: 'easy'
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('set to hard')
        res.json('set to hard')
    })
    .catch(err => console.error(err))
})

app.delete('/removeOne', (req, res) => {
    db.collection('words').deleteOne({word: req.body.removal})
    .then(result => {
        console.log('removed')
        res.json('removed')
    })
    .catch(err => console.error(err))
})

app.listen(process.env.port || PORT, () => {
    console.log(`running on port ${PORT}`)
})