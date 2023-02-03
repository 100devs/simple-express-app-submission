
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()



    dbConnectionStr = process.env.string,
    dbName = 'cat-wars-quotes'
    
    console.log(db)
    console.log(dbConnectionStr)
    console.log(dbName)

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName)
    const quotesCollection = db.collection('quotes')








app.set('view engine', 'ejs')



app.set("port", PORT)


app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: true }))

// step 27 adding JSON readability
app.use(bodyParser.json())





app.get('/', (req, res) => {
  
  
  const cursor = db.collection('quotes').find().toArray() 
  .then(results => {
      res.render('index.ejs', { quotes: results }) 
    
    })
    .catch(error => console.error(error))

  



app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      
       res.redirect('/') 
    })
    .catch(error => console.error(error))
})



app.put('/quotes', (req, res) => {


quotesCollection.findOneAndUpdate(
  { name: 'Yoda' }, 
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    upsert: true
  }
)
  
  .then(result => {res.json('Success')}) 
  .catch(error => console.error(error))  
})





app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
       if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
})









app.listen(process.env.PORT || PORT, ()=>{
  console.log('listening on 3000')
})

    console.log('Connected to Database')
  })
  .catch(error => console.error(error))
  })