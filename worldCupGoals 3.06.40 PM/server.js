const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const { response } = require('express')
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'world-cup',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database!`)
        db = client.db(dbName)
        collection = db.collection('argentina')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
        collection.find().sort({goals: -1}).toArray()
        .then (data => {
            response.render('index.ejs', {info: data})
            console.log(`Your Web-Page has been rendered`)
        })
        .catch (error => console.error(error))
})

app.get('/teams', (request, response) => {
    console.log(`hello, this is the teams page`)
    response.sendFile(__dirname + '/views/teams.html')
})

app.post('/newPlayer', (request, response) => {
    collection.insertOne({player: request.body.player, number: request.body.number, goals: 0})
    .then(result => {
        console.log('New player added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneGoal', (request, response) => {
    collection.updateOne({player: request.body.playerNameS, number: request.body.playerNumberS, goals: request.body.playerGoalS}, {
        $set: {
            goals:request.body.playerGoalS + 1
        }
        },{
            sort: {_id: -1},
            upsert: true
        })
        .then (result => {
            console.log('Added one goal')
            response.json('goal added')
        })
        .catch(error => console.error(error))
    })

app.delete('/deletePlayer', (request, response) => {
    collection.deleteOne({player: request.body.playerNameS})
    .then(result => {
        console.log(`Rapper Deleted`)
        response.json(`Rapper Deleted!`)
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})
