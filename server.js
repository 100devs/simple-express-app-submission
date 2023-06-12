const express = require('express')
const app = express()
const { MongoClient, ObjectId } = require('mongodb');
const PORT = 9001
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = process.env.DB_NAME,
    dbCol = process.env.COLLECTION_NAME

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CRUD GOES HERE
// listens for the following
// get
app.get('/', async (req, res) => {
  try{
    // makes a request for home page
    const ideas = await db.collection(dbCol).find().sort({likes: -1}).toArray()
    // we go into our db grab all of our ideas
    res.render('index.ejs', {ideas})
    // create a render using our db data, include UUID for each post within the data-uuid attribute of each li
    // respond with the rendered template html
  }
  catch(err){
    console.log(err)
  } 
})
// post
app.post('/createIdea', async (req, res) => {
  try{
    // coming from a forum
    // going to grab the property value idea from the request body
    // going to insert a new object into the DB with the idea as well as a likes count of 0
    db.collection(dbCol).insertOne({idea: req.body.newIdea, likes: 0})
    console.log('Added New Idea')
    res.redirect('/')
  }
  catch(err){
    console.log(err)
  }

  // going to respond with a refresh
})
// put
app.put('/updateLikes', async (req, res) => {
  try{
    let document = await db.collection(dbCol).find({"_id": new ObjectId(req.body.id)}).toArray()
    let likes = Number(document[0].likes)
    // coming from the client, contains the UUID of the post
    // find the matching post grab the amount of likes from the DB
    // determine whether the req body wanted to increase or decrease the likes count
    console.log(req.body.increaseLikes)
    likes += req.body.increaseLikes ? 1 : -1
    // modify the property for the value in the DB
    db.collection(dbCol).updateOne({"_id": new ObjectId(req.body.id)}, {$set: {likes: likes}})
    // respond with a refresh
    console.log('Updated Likes')
    res.json('Updated Likes')
  }
  catch(err){
    console.log(err)
  }
})
// delete
app.delete('/deleteIdea', (req, res) => {
  try{
    db.collection(dbCol).deleteOne({"_id": new ObjectId(req.body.id)})
    console.log('Idea Deleted')
    res.json('Idea Deleted')
  }
  catch(err){
    console.log(err)
  }
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})