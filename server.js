const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'affirmations'

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
    db.collection('affirmations').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addAffirmation', (request, response) => {
    db.collection('affirmations').insertOne({entry: request.body.entry,
    source: request.body.source, likes: 0})
    .then(result => {
        console.log('Affirmation Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('affirmations').updateOne({entry: request.body.entryS, source: request.body.sourceS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteAffirmation', (request, response) => {
    db.collection('affirmations').deleteOne({entry: request.body.entryS})
    .then(result => {
        console.log('Affirmation Deleted')
        response.json('Affirmation Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})