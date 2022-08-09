// Modules //
const express = require('express')
const app = express()
const cors = require('cors')
const { ObjectId } = require('mongodb')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
PORT = 8500;

// Variables //
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'calorie-tracker'

// MongoDB Connection //
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// View Engine Setup //
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// Middleware //
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// Get //
app.get('/', async (request, response) => {
        const food = await db.collection('foods').find().toArray()
        console.log(food)
        response.render('index.ejs', {foodItem: food})
})

// POST //
app.post('/track', (request, response) => {
    db.collection('foods').insertOne({foodname: request.body.foodName, foodsize: request.body.foodSize, calories: request.body.foodCal })
    .then(result => {
        console.log('Food Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// PUT //
app.put('/updateItem', (request, response) => {
    db.collection('foods').findOneAndUpdate( {
        "_id" : ObjectId(request.body.id)
        },
        { 
            $set: {
                foodname: request.body.foodName, 
                foodsize: request.body.foodSize, 
                calories: request.body.foodCal 
            }
        }
    )
    .then(result => {
        console.log('Food Updated')
        response.json('Food Updated')
    })
    .catch(error => console.error(error))
})

// Delete //
app.delete('/deleteItem', (request, response) => {
    db.collection('foods').deleteOne({foodname: request.body.foodName, foodsize: request.body.foodSize, calories: request.body.foodCal})
    .then(result => {
        console.log('Food Deleted')
        response.json('Food Deleted')
    })
    .catch(error => console.error(error))
})


// PORT //
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})