const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'best-dessert'

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
    db.collection('desserts').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addDessert', (request, response) => {
    db.collection('desserts').insertOne({dessertName: request.body.dessertName, likes: 0})
    .then(result => {
        console.log('Dessert Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('desserts').updateOne({dessertName: request.body.dessertNameS, likes: request.body.likesS},{
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

app.delete('/deleteDessert', (request, response) => {
    if(request.body.pw === process.env.DESSERT_PW){
    db.collection('desserts').deleteOne({dessertName: request.body.dessertNameS})
    .then(result => {
        console.log('Dessert Deleted')
        response.json('Dessert Deleted')
    })
    .catch(error => console.error(error))
    }else{
        console.log('Incorrect Passwword')
        response.json({msg: 'Incorrect Password'})
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})