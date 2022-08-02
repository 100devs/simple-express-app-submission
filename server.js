const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbconnectionStr = process.env.MONGODB_URI,
    dbName = 'discgolf-disc-api'

MongoClient.connect(dbconnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//CRUD METHODS
app.get('/', (request,response) => {
    db.collection('disc-info').find().toArray()
    .then(data => {
        let nameList = data.map(a => a.discName)
        console.log(nameList)
        response.render('index.ejs', {info: nameList})
    })
    .catch(error => console.error(error))
})

app.post('/api', (request,response) => {
    console.log('post heard')
    db.collection('disc-info').insertOne(request.body)
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/updateEntry', (request,response) => {
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if(request.body[key] === null  || request.body[key] === undefined || request.body[key] === ""){
            delete request.body[key]
        }
    })
    console.log(request.body)
    db.collection('disc-info').findOneAndUpdate(
        {discName: request.body.discName},
        {
            $set: request.body
        }
    )
    .then(result => {
        console.log(result)
        response.json('Success')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteEntry', (request,response) => {
    db.collection('disc-info').deleteOne(
        {discName: request.body.discName},
    )
    .then(result => {
        console.log(result)
        response.json('Entry Deleted')
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})