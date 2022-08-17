const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING, 
    dbName = 'fragrance-products' // the name of our data base the collection to access later is fragrance-safe-products

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) 
    .then(client => { 
        console.log(`Connected to ${dbName} Database`) 
        db = client.db(dbName) 
    })

//this is middleware
app.set('view engine', 'ejs') 
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 

app.get('/', async (request, response) => {  
    const safeProducts = await db.collection('fragrance-safe-products').find().toArray()

    response.render('index.ejs', { products: safeProducts})
})
//"protected" render with form
app.get('/add', async (request, response) => {
        try {
            const safeProducts = await db.collection('fragrance-safe-products').find().toArray()
            response.render('add.ejs', {products: safeProducts})
        } catch (error) {
            response.status(500).send({message: error.message})
        }
    }) 
// posting from form
app.post("/fragrance-safe-products", (req, res) => {
    db.collection('fragrance-safe-products').insertOne(req.body)
        .then(result => {
            res.redirect('/add')
        })
        .catch(error => console.error (error))
})

// adding likes from index page
app.put('/addOneLike', (request, response) => {
    db.collection('fragrance-safe-products').updateOne({ name: request.body.name },{
        $set: {
            likes:Number(request.body.likes) + 1
            }
    },{
        sort: {_id: -1},
        upsert: true //allow express/mongo to add new field if it doesn't exist.
    })
    .then(result => {
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

// deleting
app.delete('/deleteItem', (request, response) => { 
    db.collection('fragrance-safe-products').deleteOne({ name: request.body.itemFromJS }) // withth in db as defined line 19, within collection fragrance-safe-products delete the item that matches field name identified as itemFromJS
        .then(result => { 
            console.log('product removed') 
            response.json('product removed')
        })
        .catch(error => console.error(error)) 
})

app.listen(process.env.PORT || PORT, () => { 
    console.log(`Server running on port ${PORT}`) 
})