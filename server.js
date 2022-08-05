//set up modules
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 3000

//set up database

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'test',
    collection
    

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        collection=db.collection('test')
    })
//set up middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

//CRUD
app.get('/', (request, response) => {
    db.collection('test').find().sort({likes: -1}).toArray()
    .then(results=>{
        response.render('index.ejs', {info: results})
        
    }) .catch (/*...*/)
})


app.post('/quotes', (request, response)=>{
    collection.insertOne({name:request.body.name, quote:request.body.quote, likes: 0})
    .then(result=>{
        response.redirect('/')
    })
    .catch(error=>console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('test').updateOne({"name": request.body.name, "quote": request.body.quote, "likes": request.body.likesS},{
        $set: {
            "likes" : request.body.likesS + 1
            
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteMovie', (request, response) => {
    db.collection('test').deleteOne({'name': request.body.name})
    .then(result => {
        console.log(request.body.name)
        response.json('Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})