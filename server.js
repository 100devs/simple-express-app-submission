//REQURIED DEPENDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

//DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'exercise-tracker'

//CONNECT MONGO
MongoClient.connect(dbConnectionStr)
.then(client => {
  console.log(`Connected to ${dbName} database`)
  db = client.db(dbName)
})
.catch(error => console.error(error))

//SET MIDDLEWARE  
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  db.collection('exercises').find().toArray()
  .then(data => {
    // let list = data.map(item => item.exercise)
    res.render('index.ejs', {info: data})
  })
  .catch(error => console.error(error))
})

app.post('/api', (req, res) => {
  console.log('Entry created')
  db.collection('exercises').insertOne(
    req.body
  )
  .then(result =>{
    console.log(result)
    res.redirect('/')
  })
  .catch(error => console.error(error))
})

app.put('/updateEntry', (req, res) => {
  // console.log(req.body)
  Object.keys(req.body).forEach(key => {
    if(req.body[key] === null || req.body[key] === undefined || req.body[key] === ""){
      delete req.body[key]
    }
  })
  // console.log(req.body)
  db.collection('exercises').findOneAndUpdate(
    {exercise: req.body.exercise},
    {
      $set: req.body
    }
  )
  .then(result => {
    console.log(result)
    res.json('Success')
  })
  .catch(error => console.error(error))
})

app.delete('/deleteEntry', (req, res) => {
  db.collection('exercises').deleteOne(
    {exercise: req.body.exercise}
  )
  .then(result => {
    console.log('Exercise deleted')
    res.json('Exercise deleted')
  })
  .catch(error => console.error(error))
})

//SETUP LOCAL HOST
app.listen(process.env.PORT || PORT , () => {
  console.log(`Server running on port ${PORT}`)
})