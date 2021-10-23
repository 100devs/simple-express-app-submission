const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 1031
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'greys'

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
    db.collection('episodes').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addEpisode', (request, response) => {
    db.collection('episodes').insertOne({seasonNumber: request.body.seasonNumber,
    episodeNumber: request.body.episodeNumber, likes: 0}) //, likes: 0 - insert back if this doesnt work
    .then(result => {
        console.log('Episode Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('episodes').updateOne({seasonNumber: request.body.seasonNumS, episodeNumber: request.body.episodeNumS,likes: request.body.likesS},{
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

app.delete('/deleteSeason', (request, response) => {
    db.collection('episodes').deleteOne({seasonNumber: request.body.seasonNumS})
    .then(result => {
        console.log('season Deleted')
        response.json('season Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})