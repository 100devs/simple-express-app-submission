const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'hikes'

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
    db.collection('hikes').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addHike', (request, response) => {
    db.collection('hikes').insertOne({hikeName: request.body.hikeName,
    linkName: request.body.linkName, likes: 0})
    .then(result => {
        console.log('Hike Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('hikes').updateOne({hikeName: request.body.hikeNameS, linkName: request.body.linkNameS,likes: request.body.likesS},{
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

app.delete('/deleteHike', (request, response) => {
    db.collection('hikes').deleteOne({hikeName: request.body.hikeNameS})
    .then(result => {
        console.log('Hike Deleted')
        response.json('Hike Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server running on port ${PORT}`)
})
