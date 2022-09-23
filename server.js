const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'groceries'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', async(req, res) => {
    let userList = await db.collection('groceries').find().toArray()
    res.render('index.ejs', {items: userList})
})

app.post('/addgroceries', (req, res) => {
    db.collection('groceries').insertOne({newItem: req.body.newgrocery, completed: false})
    .then(result => {
        console.log('Grocery Added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.put('/complete', (req, res) => {
    db.collection('groceries').updateOne({newItem: req.body.itemFromUser}, {
        $set: {
            completed: true
        }
    }, {
        upsert: false
    })
    .then(result => {
        console.log('Item Completed')
        res.json(result)
    })
    .catch(err => console.error(err))
})

app.put('/incomplete', (req, res) => {
    db.collection('groceries').updateOne({newItem: req.body.itemFromUser}, {
        $set: {
            completed: false
        }
    }, {
        upsert: false
    })
    .then(result => {
        console.log('Item Not Completed')
        res.json(result)
    })
    .catch(err => console.error(err))
})

app.delete('/deleteItem', (req, res) => {
    db.collection('groceries').deleteOne({newItem: req.body.itemFromUser})
    .then(result => {
        console.log('Item Deleted')
        res.json(result)
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})