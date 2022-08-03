// Imports

const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.DB_STRING
const PORT = 3000
require('dotenv').config()



MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ORDTAK2')
    const ordtakCollection = db.collection('ordtak')
    // Static files
    app.use(express.static(__dirname + '/public'))
    app.use('/css', express.static(__dirname + 'public/css'))
    app.use('/js', express.static(__dirname + 'public/js'))
    app.use('/img', express.static(__dirname + 'public/img'))
    app.use(bodyParser.urlencoded({ extended: true}))

    // Set views
    app.set('views', './views')
    app.set('view engine', 'ejs')

    // App GET

    app.get('/', (req, res) => {
      db.collection('ordtak').find().toArray()
        .then(results => {
          res.render('index.ejs', { ordtak: results })
        })
        .catch(error => console.error(error))
        
    })
    // App POST

    app.post('/ordtak', (req, res) => {
      ordtakCollection.insertOne(req.body) // inserting to database
      .then(result => {
      res.redirect('/')  //directing back to the index page.
    })
    .catch(error => console.error(error))
    })

    // Listen
    app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`))

})
.catch(error => console.error(error))






