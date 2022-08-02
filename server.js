const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 2121;
require('dotenv').config()

// MongoDB connection
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'LogIt'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// View Settings
app.set('view engine', 'ejs')
app.use(express.static(__dirname +''))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initial Page Request
app.get('/',(request, response)=>{
    // Sort array by amount
    db.collection('materials').find().sort({amount: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Materials Page Request
app.get('/materials',(request, response)=>{
    // Sort array by amount
    db.collection('materials').find().sort({amount: -1}).toArray()
    .then(data => {
        response.render('material.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Adding Materials
app.post('/addMaterial', (request, response) => {
    db.collection('materials').insertOne({brand: request.body.brand,
    product: request.body.product, amount: 0})
    .then(result => {
        console.log('Material Added')
        response.redirect('/materials')
    })
    .catch(error => console.error(error))
})

// Increase material count "Add One"
app.put('/addOne', (request, response) => {
    console.log(request.body.brand)
    db.collection('materials').updateOne({brand: request.body.brand, material: request.body.material, amount: request.body.amount},{
        $set: {
            amount:request.body.amount + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One')
        response.json('One Added')
    })
    .catch(error => console.error(error))

})

// Delete Material
app.delete('/deleteMaterial', (request, response) => {
    db.collection('materials').deleteOne({brand: request.body.brand})
    .then(result => {
        console.log('material (brand) deleted')
        response.json('material (brand) deleted')
    })
    .catch(error => console.error(error))

})

// Listen on PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})