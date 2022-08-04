// ========================
// Requirements for our server
const { response } = require('express');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
require('dotenv').config()

let db,
    dbConnectionStr=process.env.DB_STRING,
    dbName = 'INVENTORY-DATABASE'

// ========================



// ========================
// Connection to database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to the ${dbName}`)
        db = client.db(dbName)

        //Shortcut for our database
        const inventoryCollection = db.collection('assets')
    
// ========================

 
    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // ========================



    // ========================
    // Routes (CRUD)
    // ========================
    app.get('/', (req, res) => {
        inventoryCollection.find().toArray()
            .then(results => {
                res.render('index.ejs', {assets:results})
            })
            .catch(error => console.error(error))
    })

    app.post('/assets', (req, res) => {
        console.log(req.body)
        inventoryCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                console.log('Asset added')
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    // ========================



    // ========================
    // Listener for server
    // ========================

    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`The inventory server is now running on port ${PORT}`)
    })
    // ========================
})
