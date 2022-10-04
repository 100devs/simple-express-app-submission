const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 4000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'travel-packing-list'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) =>{
  db.collection('items').find().toArray()
  .then(data => {
    res.render('index.ejs', { info: data })
  })
  .catch(err => console.error(err))
})

app.post('/addItem', (request, response) => {
    db.collection('items').insertOne({ item: request.body.item })
    .then(result => {
        console.log('Item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('items').deleteOne({ item: request.body.itemS })
    .then(result => {
        console.log('Item Deleted')
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))

})

app.put('/markComplete', (request, response) => { 
  db.collection('items').updateOne({ item: request.body.itemFromJS},{
      $set: { 
          completed: true 
        }
  },{
      sort: {_id: -1}, 
      upsert: false 
  })
  .then(result => {
      console.log('Marked Complete') 
      response.json('Marked Complete') 
  })
  .catch(error => console.error(error)) 
}) 

app.put('/markUnComplete', (request, response) => { 
  db.collection('items').updateOne({ item: request.body.itemFromJS},{
      $set: {
          completed: false 
        }
  },{
      sort: {_id: -1},
      upsert: false
  })
  .then(result => {
      console.log('Marked UnComplete') 
      response.json('Marked UnComplete')
  })
  .catch(error => console.error(error)) 
}) 

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})