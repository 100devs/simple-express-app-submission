const express = require('express')

const app = express()
const MongoClient = require('mongodb').MongoClient

const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_CONNECT,
    dbName = 'Book-Tracker'



MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) =>{
    db.collection('booklist').find().sort({bookRating:-1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/addBook', (req, res) =>{
    db.collection('booklist').insertOne({bookTitle: req.body.bookTitle, bookAuthor: req.body.bookAuthor,
        bookRating: req.body.bookRating, likes: 0
    })
    .then(result => {
        console.log('Book added')
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('booklist').updateOne({bookTitle: request.body.bookTitleS, bookAuthor: request.body.bookAuthorS, bookRating: request.body.bookRatingS , likes: request.body.likesS},{
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


app.delete('/deleteBook', (req, res) => {
    db.collection('booklist').deleteOne({bookTitle: req.body.bookTitleS})
    .then(result => {
        console.log('Book Deleted')
        res.json('Book Deleted')
    })
    .catch(error => console.log(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})