//Require dependencies
const { request, response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

//Declare DB Variables
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'star-trek-api'

//Connect to Mongo
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        })


//Set Middlewares
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//CRUD METHODS

app.get('/', (req, res) => {
    db.collection('star-trek-info').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.speciesName)
            console.log(nameList)
            res.render('index.ejs', {info: nameList })
        })
        .catch(error => console.log(error))

})

app.post('/api', (req, res) => {
    console.log('post heard')
    db.collection('star-trek-info').insertOne(
        req.body
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

//Does not function yet
app.post('/massinsert', (req, res) => {

})

app.put('/updateEntry', (req, res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key=> {
        if(req.body[key] == null || req.body[key] === undefined || req.body[key]=== ''){
            delete req.body[key];
        }
    });
    console.log(req.body)
    db.collection('star-trek-info').findOneAndUpdate(
        {name: req.body.name},
        {
            $set:  req.body  
        },
        // {
        //     upsert: true
        // }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })

})

app.delete('/deleteEntry', (req, res) =>{
    db.collection('star-trek-info').deleteOne(
        {name: request.body.name}
    )
    .then(result => {
        console.log('entry deleted')
        response.json('entry deleted')
    })
    .catch(err =>
        console.error(err))

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})