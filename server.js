
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionStr = `mongodb+srv://quester:fuckpasswords@cluster0.legoe93.mongodb.net/?retryWrites=true&w=majority`,
    dbName = 'Freezer-Inventory'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    //app.use(cors())
    app.set('view engine', 'ejs')   //defines the ejs view engine
    app.use(express.static('public')) //host the whole folder images ,css, jsmain whatever you want. 
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())


    //reading the data from the database and sending it to the frontend
    app.get('/',(request, response)=>{
        db.collection('rappers').find().sort({entryDate: -1}).toArray() //getting all the data in the database and putting it into an array
        .then(data => {
            response.render('index.ejs', { info: data })           //responing with the data array importing it to the ej file and servering back the html
        })
        .catch(error => console.error(error))
    })
    
    
    //creating a new rapper
    app.post('/addRapper', (request, response) => {
        db.collection('rappers').insertOne({
            //adds one new element to the database
        foodName: request.body.foodName,                        
        entryDate: request.body.entryDate,
        foodType: request.body.foodType,
        likes: 0})
        .then(result => {
            console.log('Item Added to freezer')
            response.redirect('/')
        })
        .catch(error => console.error(error))
    })
    
    app.put('/addOneLike', (request, response) => {
        console.log(request)
        db.collection('rappers').updateOne({foodName: request.body.foodNameS, entryDate: request.body.entryDateS, foodType: request.body.foodTypeS, likes: request.body.likesS},{
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
    app.put('/minusOne', (request, response) => {
        console.log(request)
        db.collection('rappers').updateOne({foodName: request.body.foodNameS, entryDate: request.body.entryDateS, foodType: request.body.foodTypeS, likes: request.body.likesS},{
            $set: {
                likes:request.body.likesS - 1
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
        console.log(request)
        db.collection('rappers').deleteOne({foodName: request.body.foodNameS})
        .then(result => {
            console.log('Food Item Deleted')
            response.json('Food Item Deleted')
        })
        .catch(error => console.error(error))
    
    })
    
    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })