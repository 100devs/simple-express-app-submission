const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config() 

let db, 
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'queer-media-recommendations'


MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true}) 
  .then(client => {
    console.log(`Connected to ${dbName} database`)
    db = client.db(dbName)
  })  

// app.use(bodyParser.urlencoded({extended: true}))

// Middleware
// Set template engine to use ejs as a template file    
app.set('view engine', 'ejs')
// Gives express access to the public folder
app.use(express.static('public'))
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }))
// Parse incoming JSON requests
app.use(express.json())

app.get('/', (req, res) => {
  db.collection('recommendations').find().toArray()
    .then(results => {
      res.render('index.ejs', {recommendations: results})
    })
    .catch(error => console.error(error))
})

app.post('/addRecommendation', (req, res) => {
  
  db.collection('recommendations').insertOne({mediaType: req.body.mediaType, mediaName: req.body.mediaName, likes:0})
    .then(result => {
      console.log('Recommendation added.')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (req, res) => {
  db.collection('recommendations').updateOne({mediaType: req.body.mediaType, mediaName: req.body.mediaName, likes: req.body.mediaLikes},{
    $set: {
      likes: req.body.mediaLikes + 1
    }
  })
  .then(result => {
    console.log('Added one like.')
    res.json('Like added.')
    res.redirect('/')
  })
  .catch(error => console.error(error))
})

app.delete('/deleteRecommendation', (req, res) => {
  db.collection('recommendations').deleteOne({mediaType: req.body.mediaType, mediaName: req.body.mediaName, likes: req.body.mediaLikes})
  .then(result => {
      console.log('Recommendation deleted.')
      res.json('Recommendation deleted.')
  })
  .catch(error => console.error(error))

})


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

