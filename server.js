
let express = require('express')
let app = express()
let {MongoClient, ObjectId} = require("mongodb")
let db
let port = process.env.PORT

if(port == null || port=="") {
  port = 3000
}
let sanitizeHTML = require("sanitize-html")

app.use(express.static('public'))

async function go() {
  let client = new MongoClient("insert db connection string")
  await client.connect()
  db = client.db()
  app.listen(port)
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.get("/",  function(req, res) {
  
  db.collection('items').find().toArray(function(err, items) {
    res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">To-Do App</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form id="create-form" action="/create-item" method="POST">
          <div class="d-flex align-items-center">
          <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul id="item-list" class="list-group pb-5">
        
      </ul>
      
    </div>
    <script>
        let items = ${JSON.stringify(items)}
    </script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
  </body>
  </html>`)
  })
  
})


app.post('/create-item', function(req, res) {
  let safeText = sanitizeHTML(req.body.text, {allowedTags:[], allowedAttributes: {}})
  db.collection('items').insertOne({text: safeText}, function(err, info) {
    res.json({_id: info.insertedId, text: safeText})

  } )

})

app.post("/update-item", function(req, res) {
  let safeText = sanitizeHTML(req.body.text, {allowedTags:[], allowedAttributes: {}})
  db.collection('items').findOneAndUpdate({_id: new ObjectId(req.body.id)}, {$set: {text: safeText}}, function() {
    res.send('Success')
  })
})

app.post('/delete-item', function(req, res) {
  db.collection('items').deleteOne({_id: new ObjectId(req.body.id)}, function() {
    res.send("Success")
  })
})

go()