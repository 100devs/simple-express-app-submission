//Declare variables
const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
let db
let dbCollection

//Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

MongoClient.connect(process.env.DB_CONNECTION,{useNewUrlParser: true})
    .then(client => {
        console.log('Connected to database')
        db = client.db('gameFunFacts')
        dbCollection = db.collection('Skyrim')
    })

    .catch((err) => {
        console.log(err);
    })
    
    app.get('/', async (req,res) => {
        db.collection('Skyrim').find().toArray()
        .then(results => {
            res.render('index.ejs', {Skyrim: results})
        })
    })
        
    app.post('/game', async (req, res) => {
        dbCollection.insertOne(req.body)
        try{
            console.log(req.body)
            res.redirect("/")
        }catch (err) {
            console.log(err)
        }
    })

    app
        .route('/delete/:id')
        .get((req, res) => {
            const id = req.params.id
            dbCollection.findByIdAndRemove(id, err => {
                if (err) return res.send(500, err)
                res.redirect('/')
            })
        })
        
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

