const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config() 


let db, //defining variables that are used to grab the hidden login info for mongodb. Used to get info from .env files
    dbConnectionStr = process.env.DB_STRING,
    dbName = "NeptuniaCRUD"

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //Connects to mongodb database
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 


app.get('/',(request, response)=>{
    db.collection('NeptuniaCRUD').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addChar', (request, response) => { //create
    db.collection("NeptuniaCRUD").insertOne({charName: request.body.charName, Likes: 0})
    .then(result => {
        console.log("Character added")
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addLike', (request, response) => { //update
    db.collection('NeptuniaCRUD').updateOne({charName: request.body.charName, Likes: request.body.likesS},{
        $set: {
            Likes:request.body.likesS + 1
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

app.delete('/deleteCharacter', (request, response) => { //delete
    db.collection('NeptuniaCRUD').deleteOne({charName: request.body.charName})
    .then(result => {
        console.log('Character Deleted')
        response.json('Character Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{ //assign the port by mongoDB or by the env file
    console.log(`Server running on port ${PORT}`)
})