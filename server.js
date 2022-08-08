const express = require('express') // npm install express --save 
const app = express() 
const MongoClient = require('mongodb').MongoClient // npm install mongodb --save
const PORT = process.env.PORT || 2122 // whichever port you want to use
require('dotenv').config() // npm install dotenv


let db,
    dbConnectionStr = process.env.DB_STRING, // this is the connection string to your database
    dbName = 'rap' // define the name of the database you want to connect to

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs') // set the view engine to ejs
app.use(express.static('public')) // set the public folder to serve static files
app.use(express.urlencoded({ extended: true })) // set the body parser to parse form data
app.use(express.json()) // set the body parser to parse json data
// app.use('/favicon.ico', express.static('public/favicon.ico')) // set the favicon to serve static files

app.get('/',(request, response)=>{ 
    db.collection('rappers').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addRapper', (request, response) => { //
    db.collection('rappers').insertOne({stageName: request.body.stageName,
    birthName: request.body.birthName, likes: 0})
    .then(result => {
        console.log('Rapper Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('rappers').updateOne(
    {
        stageName: request.body.stageNameS, 
        birthName: request.body.birthNameS,
        likes: request.body.likesS
    },{
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

app.delete('/deleteRapper', (request, response) => {
    db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
    .then(result => {
        console.log('Rapper Deleted: ' + request.body.stageNameS)
        response.json('Rapper Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})