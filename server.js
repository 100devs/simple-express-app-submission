const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let db,
    connectionStr = process.env.DB_STRING,
    dbName = 'rap_name'


MongoClient.connect(connectionStr)
.then(client => {
    db = client.db(dbName)
    console.log('Connected to database')
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req,res)=>{
    db.collection('names').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.log(error))
})

app.post('/addRapper', (req,res)=>{
    db.collection('names').insertOne({stageName: req.body.stageName, birthName: req.body.birthName, likes: 0})
    .then(data => {
        console.log('Rapper Added')
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

app.put('/addOneLike', (req,res)=>{
    db.collection('names').findOneAndUpdate({stageName: req.body.stageNameS, birthName: req.body.birthNameS, likes: req.body.likesS},
        {
            $set:{
                likes: req.body.likesS +1
            }
        }, {
            sort:{_id: -1},
            upsert: false
            //the code was creating multiple entries because of the upsert: true because it checks and if it doesnot find the object then it creates one that is why it was happening it was a glitch
        })
        .then(data => {
            res.json('like added')
        })
        .catch(error => console.log(error))
})

app.delete('/deleteRapper', (req,res)=>{
    db.collection('names').deleteOne({stageName: req.body.stageNameS})
    .then(data => {
        res.json('Rapper deleted')
    })
    .catch(error => console.log(error))
})

app.listen(process.env.PORT, ()=>{
    console.log('Connected to Port')
})

