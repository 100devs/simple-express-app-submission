//initial required bits & pieces:
const express = require("express")
const bodyParser= require('body-parser')
const app = express();
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()
const PORT = 8000

//stuff to be used, middleware etc:
// app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.set('view engine', 'ejs')

// Gotta listen out for stuff: 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running`)
});

// Database connection:
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'macshoppinglist',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        // console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('shoppinglist')
        
    })
    .catch(error => {console.error(error)});


// The CRUD parts:
// get
app.get(`/`, (req, res) => {
    collection.find().toArray()
        .then(results => {
            res.render("index.ejs", { shopping : results })
        })
        .catch(error => console.error(error))
});

// Adding items to the list:
app.post('/shoppinglist', (req, res) => {
    // console.log(req.body)
    collection.insertOne(req.body)
    .then(result => {
        // console.log(result)
        res.redirect("/")
    })
    .catch(error => console.error(error))
});

// Editting items (PUT):
app.put('/shoppinglistedit', async (req, res) => {
    const item = req.body
    const itemOld = {
        item: item["item"],
        category: item["category"]
    }
    const itemNew = {
        item: item["editItem"],
        category: item["editCat"]
    }
    // console.log(itemNew)
    await collection.replaceOne(itemOld, itemNew)
        .then(item => {
            res.status(201).json({message: "Item updated", item})
        })
        .catch(error => {
            res
                .status(400)
                .json({message: "an error occured", error: error.message})
        })
  })


// Delete item:

app.delete("/shoppinglistdelete", async (req, res) => {
    const item = req.body
    await collection.deleteOne(item)
    .then(item => {
        res.status(201).json({message: "Item deleted", item})
    })
    .catch(error => {
        res
            .status(400)
            .json({message: "an error occured", error: error.message})
    })
    })
    

