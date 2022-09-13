//NPM MODULES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

//MONGODB Connection
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'beers'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//VIEWS & PUBLIC 
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//GET
app.get('/',(request, response)=>{
    db.collection('beer').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

//POST
app.post('/addBeer', (request, response) => {
    db.collection('beer').insertOne({beerName: request.body.beerName,
    beerType: request.body.beerType, likes: 0})
    .then(result => {
        console.log('Beer Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//UPDATE
app.put('/addOneLike', (request, response) => {
    db.collection('beer').updateOne({beerName: request.body.beerNameS, beerType: request.body.beerTypeS,likes: request.body.beerLikesS},{
        $set: {
            likes:request.body.beerLikesS + 1
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

//DELETE
app.delete('/deleteBeer', (request, response) => {
    db.collection('beer').deleteOne({beerName: request.body.beerNameS})
    .then(result => {
        console.log('Beer Deleted')
        response.json('Beer Deleted')
    })
    .catch(error => console.error(error))

})

//Server
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})