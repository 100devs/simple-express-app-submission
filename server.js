const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = process.env.PORT || 2121

app.use(cors())

require('dotenv').config()

let db,
 dbConnectionStr = process.env.DB_STRING,
 dbName = 'lit',
 collection 

 MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        collection = db.collection('books')
    })

 app.set('view engine', 'ejs')
 app.use(express.static('public'))
 app.use(express.urlencoded({ extednded:
  true }))
 app.use(express.json())
 app.use(cors())

 app.get('/',(request, response) => {
  db.collection('books').find().sort({likes: -1}).toArray()
  .then(data => {
      response.render('index.ejs', { info: data })
  })
  .catch(error => console.error(error))
})


app.post('/addBook', (request, response) => {
 db.collection('books').insertOne({bookName: request.body.bookName,
     authorName: request.body.authorName,
     reasonForLiking: request.body.reasonForLiking,
     likes: 0})
 .then(result => {
     console.log('Book Added')
     response.redirect('/')
 })
 .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
 db.collection('books').updateOne({bookName: request.body.bookNameS, authorName: request.body.authorNameS,
  reasonForLiking: request.body.reasonForLikingS,
  likes: request.body.likesS},{
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

app.delete('/deleteBook', (request, response) => {
 db.collection('books').deleteOne({bookName: request.body.bookNameS})
 .then(result => {
     console.log('Book Deleted')
     response.json('Book Deleted')
 })
 .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
 console.log(`Server running on port ${process.env.PORT}`)
})

