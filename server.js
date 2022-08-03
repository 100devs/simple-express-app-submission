const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 3004

//Declared DB Variables
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'breaking-bad-quotes'

//Connect to Mongo
MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Mongo Database DH`)
    db = client.db(dbName)
    
  })

// Set Middleware
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// CRUD Methods
// READ

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')

})

app.get('/api', (req, res) => {
  const infoCollection = db.collection('quotes')
  infoCollection.find().toArray()
  .then( results => {
    console.log(results)
    res.json(results)
  })
  
})

//CREATE
app.post('/quotes', (req,res) =>{
  console.log('Post HEARD')
  // db.collection('quotes').insertOne(
  //   req.body,
  //   console.log(req.body),
  //   )
  db.collection('quotes').insertOne({author: req.body.author, quote: req.body.quote})
  .then(result =>{
    console.log(result)
    res.redirect('/')    
  })
  .catch(err => console.error(error)) 
})


//UPDATE
// app.put('/updateEntry', (req, res)=> {
//   console.log(req.body)
//   db.collection('quotes').findOneAndUpdate(
//     {author: req.body.author},
//     {
//       $set: {
//         author: req.body.author,
//         quote: req.body.quote
//       }
//     },
//     {
//       upsert: true
//     }
//   )
//   .then(result => {
//     console.log(result)
//     res.json('suckcess!')
//   })
//   .catch(error => console.log(error))
 
// })

//DELETE? Nah

app.listen(process.env.PORT || PORT , ()=> {
  console.log(`Dat Server is Running on port = ${PORT}`)
} )