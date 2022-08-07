const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'coders'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('coders-api').find().sort({lastName: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addCoder', (request, response) => {
    db.collection('coders-api')
      .insertOne({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        birthDate: request.body.birthDate,
        famousFor: request.body.famousFor,
        likes: 0,
      })
      .then((result) => {
        console.log('Coder Added');
        response.redirect('/');
      })
      .catch((error) => console.error(error));
})

app.put('/addOneLike', (request, response) => {
  db.collection('coders-api')
    .updateOne(
      {
        firstName: request.body.firstNameS,
        lastName: request.body.lastNameS,
        likes: request.body.likesS,
      },
      {
        $set: {
          likes: request.body.likesS + 1,
        },
      },{
        sort: {_id: -1},
        upsert: true
    })
    .then((result) => {
      console.log('Added One Like');
      response.json('Like Added');
    })
    .catch((error) => console.error(error));
});


app.delete('/deleteCoder', (request, response) => {
    db.collection('coders-api')
      .deleteOne({ lastName: request.body.lastNameS })
      .then((result) => {
        console.log('Coder Deleted');
        response.json('Coder Deleted');
      })
      .catch((error) => console.error(error));

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})