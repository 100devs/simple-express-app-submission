const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'planets'

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
    db.collection('planets').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addPlanet', (request, response) => {
    db.collection('planets').insertOne({planetName: request.body.planetName, likes: 0})
    .then(result => {
        console.log('planet added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('planets').updateOne({planetName: request.body.planetName, likes: request.body.likes},{
        $set: {
          likes: request.body.likes + 1
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

app.delete('/deletePlanet', (request, response) => {
    db.collection('planets').deleteOne({planetName: request.body.planetName})
    .then(result => {
        console.log('planet deleted')
        response.json('planet deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
