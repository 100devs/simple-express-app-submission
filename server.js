const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Games',
    PORT = process.env.PORT || 2121;

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
    db.collection('games').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addGame', (request, response) => {
    db.collection('games').insertOne(
      {title: request.body.title, genre: request.body.genre, platform: request.body.platform, Img: request.body.imgUrl, upVotes: 0})
    .then(result => {
        console.log('Game Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/upVote', (request, response) => {
    db.collection('games').updateOne({title: request.body.titleU, upVotes: request.body.upVotesU},
      {$set: {
            upVotes:request.body.upVotesU + 1
          }
    },{
        sort: {upVotes: +1},
        upsert: false
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
        console.log(response)
    })
    .catch(error => console.error(error))

})

app.put('/downVote', (request, response) => {
    db.collection('games').updateOne({title: request.body.titleU, upVotes: request.body.upVotesU},
      {$set: {
            upVotes:request.body.upVotesU - 1
          }
    },{
        sort: {upVotes: -1},
        upsert: false
    })
    .then(result => {
        console.log('Down Voted')
        response.json('Down Voted')
        console.log(response)
    })
    .catch(error => console.error(error))

})



app.delete('/deleteGame', (request, response) => {
    db.collection('games').deleteOne({title: request.body.titleU, upVotes: request.body.upVotesU})
    .then(result => {
        console.log('Game Deleted')
        response.json('Game Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
