

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3002
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'to-do'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('items').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addRapper', (request, response) => {
    db.collection('items').insertOne(request.body)
    .then(result => {
        console.log('item added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteRapper', (request, response) => {
    db.collection('items').deleteOne({item: request.body.stageNameS})
    .then(result => {
        console.log('item deleted')
        response.json('item deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})