const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'treasuregames'


MongoClient.connect(dbConnectionStr , { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.get('/', async (request, response) => {
  
  const gameItems = await db.collection('games').find().toArray()

  response.render('index.ejs', {items: gameItems});

})

app.post('/addGame', (request, response) => {
  db.collection('games').insertOne({name: request.body.gameName})
  .then(result => {
      console.log('Game Added')
      response.redirect('/')
  })
  .catch(error => console.error(error))
})


app.delete('/deleteItem', (request, response) => {
  db.collection('games').deleteOne({name: request.body.itemFromJS})
  .then(result => {
      console.log('Game Deleted')
      response.json('Game Deleted')
  })
  .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {

  console.log(`Server is listening on port ${PORT}.`);

});