//Header
const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//PORT
app.listen(process.env.PORT || PORT, (req,res)=>{
    console.log(`Listening on ${PORT} my main guy`)
})

//Middleware
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

//MongoDB Constants
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'mainBacklog'

//MongoDB and CRUD
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connection to MongoDB Complete. Ready to game')
        const db = client.db(dbName)//Database Name
        const tomBacklog = db.collection('tomBacklog')
        const stephenBacklog = db.collection('stephenBacklog')

        app.get('/', (req,res)=>{
            tomBacklog.find().toArray().then(result=>{
                stephenBacklog.find().toArray().then(results =>{
                  res.render('index.ejs', { tomBacklog: result, stephenBacklog: results})
                })
            .catch(error => console.error(error))
        })

        app.post('/addTomGame', (req,res) =>{
            tomBacklog.insertOne({name: req.body.name, platform: req.body.platform, likes: 0})
            .then(result => {
                console.log('Tom Game Added')
                res.redirect('/')
            })
           .catch(error => console.error(error))
        })

        app.post('/addStephenGame', (req,res) =>{
            stephenBacklog.insertOne({name: req.body.name, platform: req.body.platform, likes: 0})
            .then(result => {
                console.log('Stephen Game Added')
                res.redirect('/')
            })
           .catch(error => console.error(error))
        })

        app.put('/addOneTomLike', (req,res)=>{
            tomBacklog.updateOne({name: req.body.name, platform: req.body.platform, likes: req.body.likes},{
                $set: {
                    likes:req.body.likes + 1
                }
            },{
                sort: {_id: -1},
                upsert: true
            })
            .then(result => {
                console.log('Added One Like -Tom')
                res.json('Like Added')
            })
            .catch(error => console.error(error))
        })

        app.put('/addOneStephenLike', (req,res)=>{
            stephenBacklog.updateOne({name: req.body.name, platform: req.body.platform, likes: req.body.likes},{
                $set: {
                    likes:req.body.likes + 1
                }
            },{
                sort: {_id: -1},
                upsert: true
            })
            .then(result => {
                console.log('Added One Like -Stephen')
                res.json('Like Added')
            })
            .catch(error => console.error(error))
        })

        app.delete('/deleteTomGame', (req, res) => {
            tomBacklog.deleteOne({name: req.body.name})
            .then(result => {
                console.log('Tom Game Deleted')
                res.json('Tom Game Deleted')
            })
            .catch(error => console.error(error))
        })

        app.delete('/deleteStephenGame', (req, res) => {
            stephenBacklog.deleteOne({name: req.body.name})
            .then(result => {
                console.log('Stephen Game Deleted')
                res.json('Stephen Game Deleted')
            })
            .catch(error => console.error(error))
        })
    })
})