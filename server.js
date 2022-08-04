const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 1989
const cors = require('cors')
require('dotenv').config()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Seinfeld'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.get('/',(request, response)=>{
    db.collection('episodes').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addEpisode', (request, response) => {
    db.collection('episodes').insertOne({nameOfEpisode: request.body.nameOfEpisode, seasonNum: request.body.seasonNum, episodeNum: request.body.episodeNum, epDescription: request.body.epDescription, likes: 0})
    .then(result => {
        console.log('Episode Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('episodes').updateOne({nameOfEpisode: request.body.nameOfEpisodeS, seasonNum: request.body.seasonNumS, episodeNum: request.body.episodeNumS, epDescription: request.body.epDescriptionS, likes: request.body.likesS},{
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

app.put('/removeOneLike', (request, response) => {
    db.collection('episodes').updateOne({nameOfEpisode: request.body.nameOfEpisodeS, seasonNum: request.body.seasonNumS, episodeNum: request.body.episodeNumS, epDescription: request.body.epDescriptionS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS - 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Removed One Like')
        response.json('Like Removed')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteEpisode', (request, response) => {
    db.collection('episodes').deleteOne({nameOfEpisode: request.body.nameOfEpisodeS})
    .then(result => {
        console.log('Episode Deleted')
        response.json('Episode Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})