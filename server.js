const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

// need to add Mongo DB string to dotenv file
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'backstock'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (request, response) => {
    db.collection('deepFreezer').find().sort({itemTitle: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addDeepFreezerItem', (request, response) => {
    db.collection('deepFreezer').insertOne({itemTitle: request.body.itemTitle,
    expiration: request.body.expiration, quantity: 1})
    .then(result => {
        console.log('Deep Freezer Item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/plusOne', (request, response) => {
    db.collection('deepFreezer').updateOne({itemTitle: request.body.itemTitleS, expiration: request.body.expirationS,quantity: request.body.quantityS},{
        $set: {
            quantity:request.body.quantityS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Increased Quantity')
        response.json('Increased Quantity')
    })
    .catch(error => console.error(error))

})

app.put('/minusOne', (request, response) => {
    db.collection('deepFreezer').updateOne({itemTitle: request.body.itemTitleS, expiration: request.body.expirationS,quantity: request.body.quantityS},{
        $set: {
            quantity:request.body.quantityS - 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Decreased Quantity')
        response.json('Decreased Quantity')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteDeepFreezerItem', (request, response) => {
    db.collection('deepFreezer').deleteOne({itemTitle: request.body.itemTitleS})
    .then(result => {
        console.log('Deep Freezer Item Deleted')
        response.json('Deep Freezer Item Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})