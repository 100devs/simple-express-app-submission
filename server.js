const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { response, request } = require('express');
const PORT = 3000
require('dotenv').config()
 
let dbConnectionStr = process.env.DB_STRING

// MongoClient.connect(dbConnectionStr, (err, client) => {
//      if(err) return console.error(err)
//     console.log('Connected to Database')
//     const db = client.db('Soda-App')
// })

// MongoClient.connect(dbConnectionStr,{ 
//     useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database')
//         .catch(error=> console.error(error))
//         const db = client.db('Soda-App')
//         const sodaCollection = db.collection('soda')
//     })
    
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('Soda-App')
    const sodaCollection = db.collection('soda')

    // app.set('view engine', 'ejs')
    // app.use(express.static('public'))
    // app.use(bodyParser.json())

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })
      app.use(bodyParser.urlencoded({ extended: true }))

      app.get('/',(request, response) => {
          sodaCollection.find().toArray()
          .then(results => { 
              console.log(results)
              response.render('index.ejs',{sodas: results})
          })
          .catch(error => console.error(error))
      })
    
      app.put('/sodas', (request, response) => {
        console.log(request.body)
        sodaCollection.findOneAndUpdate(
            { brand: 'coke' },
            {
              $set: {
                brand: request.body.brand,
                flavor: request.body.flavor
              }
            },
            {
              upsert: true
            }
          )
          
          .then(result => {
              response.json('Success')
          })
      })
    
      app.post('/sodas', (request, response) => {
        sodaCollection.insertOne(request.body)
          .then(result => {
            response.redirect('/')
          })
          .catch(error => console.error(error))
      })
      app.delete('/sodas', (request, response) => {
        sodaCollection.deleteOne(
          { brand: request.body.brand }
        )
          .then(result => {
            response.json(`Deleted Soda`)
          })
          .catch(error => console.error(error))
      })
})
  



