const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'nickname'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  db.collection('nicknames').find().sort({likes: -1}).toArray()
  .then(data => {
    res.render('index.ejs', { info: data })
  })
  .catch(error => console.error(error))
})

app.post('/addName', (req, res) => {
  db.collection('nicknames').insertOne({nickName: req.body.nickName,
    birthName: req.body.birthName, likes: 0})
  .then(result => {
    console.log('Nickname Added')
    res.redirect('/')
  })
  .catch(error => console.log(error))
})

app.put('/addOneLike', (req, res) => {
  db.collection('nicknames').updateOne({nickName: req.body.nickNameX, birthName: req.body.birthNameX, likes: req.body.likesX},{
    $set: {
      likes:req.body.likesX + 1
    }
  },{
    sort: {_id: -1},
    upsert: true
  })
  .then(result => {
    console.log('Added One Like')
    res.json('Like Added')
  })
  .catch(error => console.erorr(error))
})

app.delete('/deleteName', (req, res) => {
  db.collection('nicknames').deleteOne({nickName: req.body.nickNameX})
  .then(result => {
    console.log('Name deleted')
    res.json('Name deleted')
  })
  .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
