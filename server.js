const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 8000

let db,
    dbConnectionStr = 'mongodb+srv://demo:demo2@cluster0.z1tcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName = 'champs'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    db.collection('wrestlers').find().toArray()
    .then(data => {
        res.render('index.ejs', {info:data})
    })
    .catch(error => console.error(error))
})

app.post('/addChampion', (req, res) => {
    db.collection('wrestlers').insertOne(req.body)
    .then(result => {
        console.log('champion added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteChampion', (req, res) => {
    db.collection('wrestlers').deleteOne({wrestlerName: req.body.wrestlerNameS})
    .then( result => {
        console.log('Champion Deleted')
        res.json('Champion Delete')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ( )=> {
    console.log(`server running on ${PORT}`)
})