//REQUIRED DEPENDENCIES
const express = require('express')
const app =  express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//REQUIRED DATABASE VARIABLE
let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'mets-roster-api'

//CONNECT TO MONGODB
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//SET MIDDLEWARE
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//CRUD METHODS
app.get('/',(req,res)=>{
    db.collection('player-info').find().toArray()
        .then(data => {
            let nameList = data.map(items => `${items.firstName} ${items.lastName}`)
            console.log(nameList)
            res.render('index.ejs', {info:nameList})
        })
        .catch(error => console.log(error))
})

app.post('/api', (req, res)=>{
    console.log('Post Heard')
    db.collection('player-info').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})
app.put('/updateEntry', (req, res)=>{
    console.log(req.body)
    Object.keys(req.body).forEach(key =>{
        if(req.body[key] === null || req.body[key] === undefined || req.body[key] === ""){
            delete req.body[key]
        }
    })
    console.log(req.body)
    db.collection('player-info').findOneAndUpdate(
        {firstName: req.body.firstName,
         lastName: req.body.lastName},
        {
            $set: req.body
        }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (req, res)=>{
    db.collection('player-info').deleteOne(
        {fullName: req.body.fullName.toLowerCase()}
    )
    .then(result =>{
        console.log('Entry Deleted')
        res.json('Entry Deleted')
    })
    .catch(error => console.error(error))
})


//SETUP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
