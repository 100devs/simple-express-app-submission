const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'testFoodItems'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('items').find().sort().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addItem', (request, response) => {
    db.collection('items').insertOne({itemName: request.body.itemName,
    itemPrice: request.body.itemPrice, itemPic: request.body.itemPic})
    .then(result => {
        console.log('Item added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/updatePrice', (request, response) => {
    db.collection('items').updateOne({itemName: request.body.itemNameS, itemPrice: request.body.itemPriceS, itemPic: request.body.itemPicS},{
        $set: {
            
            itemPrice: request.body.itemPriceS
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log(`Updated price of ${itemNameS}`)
        response.json('Updated price')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection('items').deleteOne({itemName: request.body.itemNameS})
    .then(result => {
        console.log(`${request.body.itemNameS} Deleted`)
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})