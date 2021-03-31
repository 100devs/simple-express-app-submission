const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient
const PORT = 3000

// Our middleware
app.set ("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

MongoClient.connect("mongodb+srv://stitches:stitches@cluster0.w8k01.mongodb.net/test?retryWrites=true&w=majority", {
 useUnifiedTopology: true
})
 .then(client => {
  console.log('Connected to Database')

    const db = client.db('animal-crossing-type')
    const typeCollection = db.collection("type")
    app.use(express.static("public"))
    // app.get(/* ... */)

    app.get("/", (req, res) => {
     db.collection("type").find().toArray()
     .then(results => {
      res.render("index.ejs", { type: results})
     })
     .catch(error => console.log(error))
     
})    
   app.put('/type', (req, res) => {
  typeCollection.findOneAndUpdate(
  { name: 'Stitches' },
  {
    $set: {
      name: req.body.name,
      type: req.body.type
    }
  },
  {
   upsert: true
  }
)
  .then(result => {res.json("Success")})
  .catch(error => console.error(error))
  })
 

    app.post("/type", (req, res) => {
     typeCollection.insertOne(req.body)
     .then(result => {
      res.redirect("/")
     })
     .catch(error => console.log(error))
    })

    app.delete("/type", (req, res) => {
     typeCollection.deleteOne(
      { name: req.body.name})
  .then(result => {
   if (result.deletedCount === 0) {
        return res.json('No type to delete')
      }
      res.json(`Deleted Pekoe type`)
    })
    .catch(error => console.error(error))
}) 

}) 


app.listen(process.env.PORT || PORT, function() {
 console.log('listening on 3000')
})