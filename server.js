const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()  //connect .env file

// Connect to database
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'popularQuotes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  })
  .catch(error => console.error(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))  
app.use(express.urlencoded({ extended: true }))  //replace body parser
app.use(express.json())

app.get( '/' , (request , response ) => {
    db.collection('quotes').find().sort( {likes: -1} ).toArray()
        .then(results => {
            response.render('index.ejs' , { info: results })
            // console.log(results)
        })
        .catch(error => console.error(error))
    // response.sendFile(__dirname + '/index.html')
} )

app.post( '/addQuote' , (request , response ) => {
    // console.log( request.body.name )
    if ( request.body.name && request.body.quote ) {
        db.collection('quotes').insertOne({name: request.body.name, quote: request.body.quote, likes: 0})
        .then(result => {
            response.redirect('/')
            // console.log(result)
        })
        .catch(error => console.error(error))
    } else {
        response.redirect('/')
    }
} )

app.put('/addOneLike', (request,response) => {
    db.collection('quotes').updateOne( { name: request.body.nameS, quote: request.body.quoteS, likes: request.body.likesS } , {
        $set: {
            likes:request.body.likesS + 1
          }
    } , {
        //sort: {_id: -1},
        upsert: true  //insert a doc if no doc can be updated
    } )
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.delete( '/deleteQuote' , (request, response) => {
    db.collection('quotes').deleteOne(  { name: request.body.nameS } )
    .then(result => {
        console.log('Quote Deleted')
        response.json('Quote Deleted')
    })
    .catch(error => console.error(error))
})

app.listen( process.env.PORT || PORT , function() {
    console.log(`listening on port ${PORT}`)
})