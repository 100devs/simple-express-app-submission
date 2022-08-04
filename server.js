const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'DiscGolfScoreKeeper'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//READ: What should 'rappers' = scorecard be?
app.get('/',(request, response) =>{
    db.collection('players').find().sort({score: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data})
    })
    .catch(error => console.error(error))
})

//CREATE /addPlayer = /addRapper
app.post('/addPlayer', (request, response) => {
    db.collection('players').insertOne({playerName: request.body.playerName, score: 0})
    .then(result => {
        console.log('New player added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//UPDATE - RAISE score
app.put('/addOneStroke', (request, response) => {
    db.collection('players').updateOne({playerName: request.body.playerNameCur, score: request.body.scoreCur},{
        $set: {
            score:request.body.scoreCur + 1
        }
    },{
       sort: {_id: -1},
       upsert: true 
    })
    .then(result => {
        console.log('Added a stroke to score')
        response.json('Stroke added')
    })
    .catch(error => console.error(error))
})

//UPDATE - LOWER score
app.put('/removeOneStroke', (request, response) => {
    db.collection('players').updateOne({playerName: request.body.playerNameCur, score: request.body.scoreCur},{
        $set: {
            score:request.body.scoreCur - 1
        }
    },{
       sort: {_id: -1},
       upsert: true 
    })
    .then(result => {
        console.log('Removed a stroke from score')
        response.json('Stroke removed')
    })
    .catch(error => console.error(error))
})

//DELETE: deleteOne
app.delete('/deletePlayer', (request, response) => {
    db.collection('players').deleteOne({playerName: request.body.playerNameCur || ''})
    .then(result => {
        console.log('Player deleted')
        response.json('Player deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})