const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db, 
    dbConnectionString = process.env.DB_STRING,
    dbName = 'star-wars-quotes',
    collection 

    MongoClient.connect(dbConnectionString)
        .then(client => {
            console.log('Connected to db')
            db = client.db(dbName)
            collection = db.collection('quotes')
        })

        //middleware
        app.set('view engine', 'ejs')
        app.use(express.static('public')) //setting up external files and serves all files from public folder when called
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())

        app.get("/",  (request, response) => {
            collection.find().toArray()
            .then(data => {
                response.render('index.ejs', {info: data})
            })
        })

        app.post('/addOne', async (request, response) => {
            collection.insertOne({name: request.body.charName,
            quote: request.body.addQuote})
            try {
                console.log('New info added')
                response.redirect('/')
            } catch (error) {
                response.status(500).send({message: error.message})
            }
        })

        app.post('/updateOne', async (request, response) => {
            const data = request.body;
            collection.updateOne({"name": data.charName}, {$set: {
                    name: data.charName,
                    quote: data.updateQuote
                }})
            try {
                console.log('Update was successful')
                response.redirect('/')
            } catch (error) {
                response.status(500).send({message: error.message})
            }
        })

        app.post('/deleteOne', async (request, response) => {
            const data = request.body;
            collection.deleteOne({"name": data.charName})
            try {
                console.log('Delete was successful')
                response.redirect('/')
            } catch (error) {
                response.status(500).send({message: error.message})
            }
        })

        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is running on port`)
        })