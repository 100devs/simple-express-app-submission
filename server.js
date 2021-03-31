const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 8000
const dotenv = require('dotenv').config({
    path: './secrets/.env'
})


app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let db,
    dbConnectionStr = process.env.dbConnection,
    dbName = 'superpowerdb'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} Database`)  
})
.catch(error => console.error(error))

app.get('/', (request, response) => {
    db.collection('powerscollection').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addPower', (request, response) => {
    db.collection('powerscollection').insertOne(request.body)
    .then(result => {
        console.log('Power Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deletePower', (request, response) => {
    db.collection('powerscollection').deleteOne({powerName: request.body.powerName})
    .then(result => {
        console.log('Power Deleted')
        response.json('Power Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})