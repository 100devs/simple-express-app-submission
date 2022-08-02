const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'run-tracker'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) => {
    db.collection('runSessions').find().sort({ date: 1 }).toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addSession', (request, response) => {
    db.collection('runSessions').insertOne({
        date: request.body.date,
        startTime: request.body.startTime,
        endTime: request.body.endTime,
        runTime: request.body.runTime,
        heartRate: request.body.heartRate,
        distance: request.body.distance,
        calories: request.body.calories,
        notes: request.body.notes,
        pains: request.body.pains

    })
        .then(result => {
            console.log('Session Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/editData', (request, response) => {
    db.collection('runSessions').updateOne({ stageName: request.body.stageNameS, birthName: request.body.birthNameS, likes: request.body.likesS }, {
        $set: {
            likes: request.body.likesS + 1
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(result => {
            console.log('Added One Like')
            response.json('Like Added')
        })
        .catch(error => console.error(error))

})

app.delete('/deleteSession', (request, response) => {
    db.collection('runSessions').deleteOne({ date: request.body.date })
        .then(result => {
            console.log('Session Deleted')
            response.json('Session Deleted')
        })
        .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})