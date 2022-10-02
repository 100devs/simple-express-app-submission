const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'calls'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('calls').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addCall', (request, response) => {
    db.collection('calls').insertOne({
        clientName: request.body.clientName,
        clientEmail: request.body.clientEmail, 
        clientPhone: request.body.clientPhone, 
        date: request.body.date, 
        clientNotes: request.body.clientNotes})
    .then(result => {
        console.log('Client Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('calls').updateOne({
        clientName: request.body.clientNameS,
        clientEmail: request.body.clientEmailS,
        clientPhone: request.body.clientPhoneS,
        date: request.body.dateS,
        clientNote: request.body.clientNoteS,
        likes: request.body.likesS
    },{
        $set: {
            likes:request.body.likesS + 1
          }
    },)
    .then(result => {
        console.log('Client Starred')
        response.json('Star Added')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteClient', (request, response) => {
    db.collection('calls').deleteOne({
        clientName: request.body.clientNameS
    })
    .then(result => {
        console.log('Client Deleted')
        response.json('Client Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})