const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const { v4: uuidv4 } = require('uuid');
PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'pizza-toppings',
    collection = 'toppings'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database.`)
    db = client.db(dbName)
  })

///////// MIDDLEWARES /////////////////////////////////////
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // Parses URL via qs library
app.use(express.json())

///////// ROUTES /////////////////////////////////////
app.get('/', (req, res) => {
  db.collection(collection).find().sort({likes: -1}).toArray()
    .then(data => {
      // console.log(data)
      res.render('index.ejs', { info: data })
    })
    .catch(error => console.log(error))
})

//add new topping
app.post('/addTopping', (request, response) => {
  const addedTopping = request.body.topping.split(' ').map( word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  const uuid = uuidv4();
  db.collection(collection).insertOne({id: uuid,topping: addedTopping, likes: 0})
  .then(result => {
      console.log('Added topping:', addedTopping)
      response.redirect('/')
  })
  .catch(error => {
    console.error(error)
    response.redirect('/')
  })
})

//update likes on a topping
app.put('/updateLike', (request, response) => {
  console.log('request',request.body)
  const newCount = request.body._vote === "up" ? request.body.likes + 1 : request.body.likes - 1

  db.collection(collection).findOneAndUpdate(
    { "topping": request.body.topping },
    { $set: { "likes": newCount } },
  )
  .then( result => {
    console.log('Updated vote for', request.body.topping,'to',newCount)
    response.json('Like updated')
  })
  .catch(error => console.error(error))
})

//remove a topping
app.delete('/deleteTopping', (request,response) => {
  const submittedPasscode = request.body._pw
  const removedTopping = request.body.toppingToDelete

  if(submittedPasscode === process.env.DELETE_CODE){
    db.collection(collection).deleteOne({topping: removedTopping})
    .then(result => {
      console.log('Removed topping:', removedTopping)
      response.json(`${removedTopping} topping removed`)
    })
    .catch(error => console.error(error))
  } else {
    console.log("Incorrect Passcode")
    response.json({msg : 'Incorrect Passcode'})
  }
})

///////// LISTENER /////////////////////////////////////
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on ${PORT}`)
}) 