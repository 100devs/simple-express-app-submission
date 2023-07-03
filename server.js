const express = require('express') //getting access to express
const app = express() //using express
const MongoClient = require('mongodb').MongoClient
const PORT = 3000 //setting local port number
require('dotenv').config() //setting private env files

let db,
    quotesCollection, //directing conection to database to env file
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'catFact' //db name

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connecting to database and getting comfirmation.
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        quotesCollection = db.collection('facts')
    })
        // Move route handlers and any code that needs to access `db` inside this block
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({extended : true}))
        app.use(express.json())

        app.get('/', async (req, res) => {
            const catFacts = await quotesCollection.find().toArray()
            res.render('index.ejs', {fact: catFacts})                
        })
        
        app.get('/api', async(req, res) => {
            const catFacts = await quotesCollection.find().toArray()
            res.json(catFacts)     
        })

        app.post('/newFact', (req, res) => {
            quotesCollection.insertOne(req.body)
              .then(result => {
                console.log(result)
                res.redirect('/')
              })
              .catch(error => console.error(error))
          }) 
      
          app.delete('/deleteItem', (request, response) => {
            quotesCollection.deleteOne({fact: request.body.itemFromJS})
            .then(result => {
                console.log('Fact Deleted')
                response.json('Fact Deleted')
            }) 
            .catch(error => console.error(error))
             
        })
        app.listen(process.env.PORT || PORT, () => {
            console.log('SERVER UP') 
        })