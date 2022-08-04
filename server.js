const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()


let db, 
dbConnectionStr= process.env.DB_STRING,
dbName='quotes'

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
    db.collection('scarymovies').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addmovie', (request, response) => {
    db.collection('scarymovies').insertOne({movieName: request.body.movieName,
    year: request.body.year, likes: 0})
    .then(result => {
        console.log('Movie added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('scarymovies').updateOne({movieName: request.body.movieNameS, year: request.body.yearMovie,likes: request.body.likesS},{
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

app.delete('/deleteMovie', (request, response) => {
    db.collection('scarymovies').deleteOne({movieName: request.body.movieNameS})
    .then(result => {
        console.log('Movie Deleted')
        response.json('Movie Deleted')
    })
    .catch(error => console.error(error))

})



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

//