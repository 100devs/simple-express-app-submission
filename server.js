// Requiring dependancies

const express = require('express')
const app = express()
const cors = require ('cors')
const MongoClient = require('mongodb').MongoClient
const { response } = require('express')
require('dotenv').config()

const PORT = 8700

// declaring variables globally
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'inspirational-quote',
    collection
    

// connecting to MongoDB
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('quotes')
    })
   
// setting up middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// express request handlers
app.get('/', (request, response) => {
    collection.find().toArray()
    .then(data => {
        response.render('index.ejs', {quotes: data})
    })
    .catch(error => console.error(error))
   
})

app.post('/quotes', (request, response) => {
    collection.insertOne({name: request.body.name, quote: request.body.quote, likes: 0})
    .then(data => {
        console.log('Quote added')
        response.redirect('/')
    })
})

app.put('/heartMe', (request, response) => {
    console.log(request.body)
    collection.updateOne({name: request.body.name, quote: request.body.quote, likes: request.body.likesT}, {
        $set: {
            likes: request.body.likesT + 1
            }
        },{
            sort: {_id: -1},
            upsert: false
        
    }) 
    .then(result => {
        console.log('Likes updated')
        response.json('Added one more like')
    })
})


app.delete('/deleteLine', (request, response) => {
    console.log(request.body)
    collection.deleteOne({ name : request.body.name, quote: request.body.quote})
  
    .then(data => {
      console.log('Quote Deleted')
      response.json('Quote Deleted')
       
    })
    .catch(error => console.error(error))
})
// Listening to Port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
}) 




