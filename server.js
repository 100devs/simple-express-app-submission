const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId; 
require('dotenv').config()

app.set('view engine', 'index.ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const dbConnectionString = process.env.DB_STRING,
    PORT = process.env.PORT || 3000

let db,
    dbCollection,
    dbName = 'universalComments',
    collectionName = 'comments'

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        dbCollection = db.collection(collectionName)
    })

// CREATE    
app.post('/message', async (req, res) => {
    try {
        let insert = {
            comment: req.body.message,
            date: new Date(),
        }
        await dbCollection.insertOne(insert)
        console.log(`Inserted Data:`, insert)
        res.redirect('/')
    } catch (error) {
        response.status(500, error.message)
    }
})

// READ
app.get('/', async (req, res) => {
    try {
        // add in .sort({propName: 1(ascending) OR -1(descending)}), to sort the data as desired
        let results = await dbCollection.find().sort({ date: -1 }).toArray()
        console.log('Page Accessed')
        // modify the object name to whatever is relevant
        res.render('index.ejs', { data: results }) 
    } catch (error) {
        // console.error(error)
        res.status(500, error.message)
    } 
})

// UPDATE
app.put('/message', async (req, res) => {
    try {
        let update = await dbCollection.updateOne( {"_id": ObjectId(req.body._id)},
        {
            // change propertyname to updated value
            $set: { 
                comment: req.body.message,
                // date: new Date(),
            },
        },
        {
            // will you add in a new object if it doesn't exist? true / false
            upsert: false
        })

        // whatever was updated
        console.log('Post updated:', update)
        // if you want to give a json response
        res.json('update complete')
    } catch (error) {
        response.status(500, error.message)        
    }
})


// DELETE
app.delete('/message', async (req, res) => {
    try {
        let deletedObject = await dbCollection.find({"_id": ObjectId(req.body._id)}).toArray()
        await dbCollection.deleteOne({"_id": ObjectId(req.body._id)})
        console.log('Thing deleted:', deletedObject[0])
        res.json('Post Deleted')
    } catch (error) {
        response.status(500, error.message)
    } 
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})