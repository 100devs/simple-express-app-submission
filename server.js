const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STR,
    dbName = 'notes'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
            console.log(`Connected to ${dbName} Database`)
            db = client.db(dbName)  
    })



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (request, response) => {
    const notes = await db.collection('notes').find().toArray()
    response.render('index.ejs', {notes: notes})
    console.log(notes)
})

app.post('/submit-note', (req, res) => {
    db.collection('notes').insertOne(req.body)
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})

app.delete('/delete-note', (req, res) => {
    db.collection('notes').deleteOne({_id: new mongodb.ObjectID(req.body.itemFromJs)})
    .then(result => {
        console.log(result)
        res.json('Note Deleted')
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})