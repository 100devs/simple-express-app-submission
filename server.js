// console.log("this is a test")

// step 0.5 
// in terminal, run this command:
//  npm install --only=dev  (if this doesn't work before "npm init", do it after as in step 1.5)
// npm init --yes or npm init -y
// npm install express --save


//step 1
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()
// test
// const PORT = process.env.PORT || '3000'

// const mongoose = require('mongoose')
// const url = 'mongodb+srv://yuki:yukii@cluster0.wic7e.mongodb.net/cat-wars-quotes?retryWrites=true&w=majority'

// mongoose.connect(url, { useNewUrlParser: true })

// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })


// step 1.5 (back up plan in case step 0.5 doesn't work)
// in terminal, run this command:
//  npm install --only=dev



//step 6 -- this code is same from step 8
// const MongoClient = require('mongodb').MongoClient

//step 8 (maybe not...)-- this came from mongodb atlas site -- change username + password (myFirstDatbase changes if you are using Mongoose)


// const MongoClient = require('mongodb').MongoClient;
// // was const = uri
// const connectionString = "mongodb+srv://yuki:yuki@cluster0.wic7e.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



// step 8
// was const = uri
// const connectionString = "mongodb+srv://yuki:yukii@cluster0.wic7e.mongodb.net/cat-wars-quotes?retryWrites=true&w=majority";
// NEW const connectionString = 'mongodb+srv://yuki:yukii@cluster0.qkej8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

let db,
    dbConnectionStr = process.env.string,
    dbName = 'cat-wars-quotes'
    
    console.log(db)
    console.log(dbConnectionStr)
    console.log(dbName)

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName)
    // const db = client.db('cat-wars-quotes')
    // step 10 add this
    const quotesCollection = db.collection('quotes')




// STEP 35 add this to the MAIN.JS
// const messageDiv = document.querySelector('#message')

// deleteButton.addEventListener('click', _ => {
//   fetch(/* ... */)
//     .then(/* ... */)
//     .then(response => {
//       if (response === 'No quote to delete') {
//         messageDiv.textContent = 'No Darth Vadar quote to delete'
//       } else {
//         window.location.reload(true)
//       }
//     })
//     .catch(/* ... */)
// })




// STEP 15 
app.set('view engine', 'ejs')
// STEP 15.5 create the index.ejs like:
// mkdir views
// touch views/index.ejs

// final step for heroku
app.set("port", PORT)

// STEP 24.1 now added
app.use(express.static('public'))

// STEP 9!! THEY ALL GO INERE HERE:
// CRUD --- use, get, post, listen
 //step 4  ENTER CREATE in CRUD
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// step 27 adding JSON readability
app.use(bodyParser.json())




// step 3 (was step 3)
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

// step 3 updated
// step 3.5 npm install nodemon --save-dev
app.get('/', (req, res) => {
  
   // step 12 start enter READ in CRUD -- we use find() method
  const cursor = db.collection('quotes').find().toArray()  // step 13 added .toArray() method
   // step 13 start -- added .then and .catch INSIDE OF STEP 12!!! console.log of results 
  .then(results => {
      res.render('index.ejs', { quotes: results }) // step 18 added "quotes: results" inside of {}
      // console.log(results) step 18.5 commented out
    })
    .catch(error => console.error(error))

    // step 16 this renders the index.ejs file



// res.render('index.ejs', { quotes: results }) // step 17 added "quotes: results" inside of {}

// step 17 GO TO EJS FILE and do this:
//  <form> (usual form content, look at code below) </form>
//   <%= quotes %>

  // step 13 end
  // console.log(cursor)  // STEP 19 commented out (19.1 and a 19.2 below too!)
  // step 12 end

 // res.sendFile(__dirname + '/index.html') // STEP 19.1 commented out
//  console.log(__dirname) // STEP 19.2 commented out
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})




// step 20 was this in the ESJ file underneath the FORM:

// <h2> Quotes </h2>
// <ul class="quotes">
//   <!-- Loop through quotes -->
//   <% for(var i = 0; i < quotes.length; i++) {%>
//     <li class="quote">
//       <!-- Output name from the iterated quote object -->
//       <span><%= quotes[i].name %></span>:
//       <!-- Output quote from the iterated quote object -->
//       <span><%= quotes[i].quote %></span>
//     </li>
//   <% } %>
// </ul>

// step 21 comment out <%= quotes %> in ESJ file... otherwise you get {obejcts} printed in your HTML END READ in CRUD enter UPDATE!!

// step 22 ENTER UPDATE in index.EJS file do this:
//<div>
//  <h2>Darth Vadar invades!</h2>
//  <p>
//    Replace first Yoda's quote with a quote written by Darth Vadar
//  </p>
//  <button id="update-button">Replace Yoda's quote</button>
//</div>


// STEP 23 
//$ mkdir public
// $ touch public/main.js

//STEP 24
// add this above in the app.use area inside of function
// app.use(express.static('public'))

// STEP 25 
// add the linking of SCRIPT to index.EJS file
// <body>
//  <!-- ... -->
//  <script src="/main.js"></script>
// </body>

// STEP 26 
// add this to main.js file:
//const update = document.querySelector('#update-button')
//update.addEventListener('click', _ => {
//  fetch('/quotes', {
//    method: 'put',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({
//      name: 'Darth Vadar',
//      quote: 'I find your lack of faith disturbing.'
//    })
//  })
//})


// step 5 
// app.post('/quotes', (req, res) => {
//   console.log(req.body)
// })

// step 11 (formally step 5, now bigger)
app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      // console.log(result) step 12 comment this out, otherwise you'll see a MASSIVE message in the terminal
       res.redirect('/') // step 13 END "CREATE" OPERATION in the CRUD order this make the loading "wheel" on the browser tab stop -- it will also look differnt in the terminal without the console.log(result) <-- massive message!
    })
    .catch(error => console.error(error))
})


// step 28 adding a PUT request AFTER app.use
app.put('/quotes', (req, res) => {
//  console.log(req.body) // step 28.5 now that you've seen the result in terminal, comment out!

// step 29 START
quotesCollection.findOneAndUpdate(
  { name: 'Yoda' }, // STEP 30.5 you MUST use "Yoda" (watch spelling) in name for updateExisting:true to happen!!!!
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
  // .then(result => {console.log(result)}) // STEP 30 added "console.log(result)"
  .then(result => {res.json('Success')}) // STEP 31 remove "console.log(result)" and replace with res.json("success")
  .catch(error => console.error(error))  // STEP 31.1 END UPDATE in CRUD
})

// step 29 END

// STEP 32 add this code to INDEX.EJS
// { /* <div>
//  <h2>Remove Darth Vadar!</h2>
//  <p>
//    Delete one Darth Vadar's quote. Does nothing if there are no more Darth
//    Vadar's quote
//  </p>
//  <button id="delete-button">Delete Darth Vadar's quote</button>
// </div> */ }
// END STEP 32



// STEP 33 START this goes in MAIN.JS
// const deleteButton = document.querySelector('#delete-button')

// deleteButton.addEventListener('click', _ => {
//   fetch('/quotes', {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'Darth Vadar'
//     })
//   })
//     .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(data => {
//       window.location.reload()
//     })
// })
// STEP 33 END



    // STEP 34 deleting Darth Vader messages
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


// STEP 35 add this underneath delete buttong in INDEX.EJS
// <div id="message"></div>





//step 2  and STEP 11 moving this down 
app.listen(process.env.PORT || PORT, ()=>{
  console.log('listening on 3000')
})

    console.log('Connected to Database')
  })
  .catch(error => console.error(error))

// STEP 14 npm install ejs --save   === ejs is for dynamic content to an HTML file


//step 7 --- now step 9 filling it in NON promise version!
// MongoClient.connect(connectionString, {
// step 9.5 start
// useUnifiedTopology: true
// step 9.5 end
// }, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// })


// step 9 the PROMISE version:
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//   })
//   .catch(error => console.error(error))