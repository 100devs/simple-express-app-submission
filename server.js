const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 8000
require('dotenv').config()


let db,
  dbConnectionStr = process.env.DB_STRING
  dbName = 'book'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db(dbName)
  })
  .catch(error => console.error(error))


app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('books').find().toArray()
    .then(data =>{
      response.render('index.ejs', {})
    })
    .catch(error => console.error(error))
})

app.post('/addBook', (request, response)=>{
    db.collection('books').insertOne(request.body)
    .then(result =>{
      console.log(result)
      response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteBook', (request, response)=>{
  db.collection('books').deleteOne({title: request.body.title})
  .then(result =>{
    console.log('Book Deleted')
    response.json('Book Deleted')
  })
  .catch(error => console.error(error))
})

app.get('/api/books', (request, response) => {
  db.collection('books').find().toArray()    
  .then(data =>{
    response.json(data)
  })
  .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})