const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'movie-list'

//////////Connect to MongoDB///////////////////////////////////////////////////////////
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

///////////Middleware/////////////////////////////////////////////////////////////////
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

///////////Handles Root Homepage Route////////////////////////////////////////////////
app.get('/',(request, response)=>{
    db.collection('movies').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

//////////Handles Adding a Movie////////////////////////////////////////////////////
app.post('/addMovie', (request, response) => {
    db.collection('movies').insertOne({title: request.body.title, likes: 0})
    .then(result => {
        console.log('Movie Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


//////////Handles Adding a Like/////////////////////////////////////////////////////
app.put('/addOneLike', (request, response) => {
    console.log(request.body.likes)
    db.collection('movies').updateOne({title: request.body.stageNameS, likes: request.body.currentLikes},{
        $set: {
            likes:request.body.currentLikes + 1
          }
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})


////////Handles Delete Requests//////////////////////////////////////////////////////////
app.delete('/deleteMovie', (request, response) => {
    db.collection('movies').deleteOne({title: request.body.stageNameS})
    .then(result => {
        console.log('Movie Deleted')
        response.json('Movie Deleted')
    })
    .catch(error => console.error(error))

})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})