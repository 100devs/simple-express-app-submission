const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 3000
require('dotenv').config()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(cors())

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'games'

MongoClient.connect(dbConnectionString,{ useUnifiedTopology: true }).then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})




app.get('/', (req, res) => {
    db.collection('allgames').find().sort({completed: -1}).toArray().then(data => {
        res.render('index.ejs', {list : data})
    }).catch(err => console.error(err))
})

app.post('/addGame', (req, res) => {
    db.collection('allgames').insertOne({gameName: req.body.gameName, completed: false}).then(result => {
        console.log('game added')
        res.redirect('/')
    }).catch(err => console.error(err))
})

app.put('/markComplete', (req, res) => {
    db.collection('allgames').findOneAndUpdate({gameName: req.body.gameName},
        {
            $set: {
                completed: true
            }
        }, {
        upsert: false
        }).then(result => {
           console.log('game marked complete')
            res.json('game marked complete')
    }).catch(err => console.error(err))
})

app.delete('/deleteGame', (req, res) => {
    db.collection('allgames').deleteOne({gameName : req.body.gameName}).then(result => {
        console.log('game deleted')
        res.json('game deleted')
    }).catch(err => console.error(err))
})




app.listen(process.env.PORT || 3100, (req,res) => {
    console.log(`Connected to ${dbName} on Port ${process.env.PORT || 3100}`)
})