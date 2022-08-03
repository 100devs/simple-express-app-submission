console.log('May Node be with you')
const bodyParser = require('body-parser')
const express = require('express')
const app = express() 
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3000
require('dotenv').config()


let db,
dbConnectionString = process.env.DB_STRING,
dbName = 'vader'


MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
.then (client => {
    console.log('connected to database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
        .then(results => {
            console.log(results)
            res.render('index.ejs',{quotes:results})
        })
        .catch(error => console.error(error))
        
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
            //console.log(result)
        })
        .catch(error => console.error(error))
    })
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
        {name: 'yoda'},
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
    .then(result => {
       console.log(result)
       res.json('Success')
       
    })
    .catch(error => console.error(error))
})
    app.delete('/quotes', (req, res)=> {
        quotesCollection.deleteOne(
            {name: req.body.name}
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json("Deleted Darth Vader's quote")
        })
        .catch (error => console.error(error))
    })
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on port ${PORT}`)
    /*app.listen(3000, function() {
        console.log('listening on 3000')*/
    }) 
})
.catch(error => console.error(error))







