const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const PORT = 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'visit',
    visitorCollection

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`connected to ${dbName}` )
        db = client.db(dbName)
        visitorCollection = db.collection('visitor')
        console.log(db.collections())
    })




app.get('/', (req, res) => {
    visitorCollection.find().toArray()
    .then( data => {
        res.render('index.ejs', {info: data})})
    console.log('values updated')
})

app.post('/addName', (req, res)=> {
    visitorCollection.insertOne({name: req.body.name, country: req.body.country})
    .then(result => {
        res.redirect('/')
    })
})

app.delete('/deleteName', (req, res) => {
    visitorCollection.deleteOne({name: req.body.nameS, country: req.body.countryS})
    .then(result => {
        console.log('deleted')
        res.json('deleted')
    })
    .catch(error => console.log(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
