const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'netflix-watchlist',
    titleCollection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        titleCollection = db.collection('netflixTitles')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    db.collection('netflixTitles').find().toArray()
      .then(netflixTitles => {
        res.render('index.ejs', { netflixTitles: netflixTitles })
      })
      .catch(error => console.error(error))
})


  app.post('/title', (req, res) => {
    titleCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/title', (req, res) => {
    titleCollection.findOneAndUpdate(
      { genre: "Drama" },
      {
        $set: {
          genre: req.body.genre,
          title: req.body.title
        }
      },
      {
        upsert: true
      }
    )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })

  app.delete('/title', (req, res) => {
    titleCollection.deleteOne(
      { genre: req.body.genre }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No title to delete')
        }
        res.json('Deleted The Title')
      })
      .catch(error => console.error(error))
  })


//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})