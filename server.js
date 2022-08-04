const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'quote'

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
    db.collection('quoteWall').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addQuote', (request, response) => {
    db.collection('quoteWall').insertOne({authorName: `Author Name: ${request.body.authorName}`,
        quoteContent: request.body.quoteContent, likes: 0})
    .then(result => {
        console.log('Quote Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('quoteWall').updateOne({authorName: request.body.authorNameS, quoteContent: request.body.quoteContentS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteNote', (request, response) => {
    db.collection('quoteWall').deleteOne({authorName: request.body.authorNameS})
    .then(result => {
        console.log('Note Deleted')
        response.json('Note Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
