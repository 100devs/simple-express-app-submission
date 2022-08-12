console.log("Tell me your secrets");
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const PORT = 3000

let db,
    dbConnectionString = process.env.MONGODB_URI,
    dbName = 'secret-confessions'

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db(dbName);
        const secretCollection = db.collection('secrets');

        app.set('view engine', 'ejs')
        app.use(express.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(express.json())




        // GET request handler
        app.get('/', (req, res) => {
            secretCollection.find().sort({likes: -1}).toArray()
                .then(results => {
                    //console.log(results)
                    res.render('index.ejs', {secrets: results})  // renders the array 'results' (often called 'data') under the name 'secrets'
                })
                .catch(error => console.error(error))
        })




        // POST request handler
        app.post('/addSecret', (req, res) => {
            secretCollection.insertOne({location: req.body.location, secret: req.body.secret, likes: 0})
                .then(result => {
                    console.log('Secret Added')
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })




        // PUT request handler
        app.put('/addOneLike', (req, res) => {
            secretCollection.updateOne({location: req.body.location, secret: req.body.secret, likes: req.body.likes},{
                    $set: {
                        likes: req.body.likes + 1
                    }
                },
                {
                    sort: {_id: -1},
                    upsert: true
                }
            )
            .then(result => {
                console.log('Added one like')
                res.json('Like added')
            })
            .catch(error => console.error(error))
        })




        // DELETE request handler
        app.delete('/deleteSecret', (req,res) => {
            secretCollection.deleteOne(
                {secret: req.body.secret}
            )
            .then(result => {
                console.log("Secret deleted")
                res.json("Deleted secret")
            })
            .catch(error => console.error(error))
        })
        





        app.listen(process.env.PORT || PORT, function() {
            console.log(`Server is running... you better go catch it`)
        })
    })
    .catch(error => console.error(error))