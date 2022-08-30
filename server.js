//Node Modules
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'grocery'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client =>{
        console.log('Connected to database')
        db = client.db(dbName)
        })

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    app.get('/', (request, response)=>{
        db.collection('items').find().toArray()
        .then(data => {
            response.render('index.ejs', {item: data, completed: false})
        })
        .catch(error => console.error(error))
    })

    app.post('/addItem', (request,response) => {
        db.collection('items').insertOne({groceryItem: request.body.groceryItem, completed: false})
        .then(result => {
            console.log('Item Added')
            response.redirect('/')
        })
        .catch(error => console.log(error))
    })


   app.put('/itemCompleted', (request,response) =>{
        db.collection('items').updateOne({groceryItem: request.body.groceryItem},{
            $set: {
                completed: true
            }
    },{
        upsert: false
    })
    .then(result => {
        console.log('Item Completed')
        response.json('Item Completed')
    })
        .catch(error => console.error(error))
    
})

app.put('/itemNotCompleted', (request,response) =>{
    db.collection('items').updateOne({groceryItem: request.body.groceryItem},{
        $set: {
            completed: false
        }
},{
    sort: {_id: -1},
    upsert: false
})
.then(result => {
    console.log('Item Not Completed')
    response.json('Item Not Completed')
})
    .catch(error => console.error(error))

})


    app.delete('/deleteItem', (request,response) => {
        db.collection('items').deleteOne({groceryItem: request.body.groceryItem})
        .then(result => {
            console.log('Item Deleted')
            response.json('Item Deleted')
        })
        .catch(error => console.error(error))
    })


    app,delete('/reset', (request,response) => {
        db.collection('items').deleteMany({groceryItem: request.body.groceryItem})
        .then(result => {
            console.log('Grocery List Reset')
            response.json('Grocery List Reset')
        })
        .catch(error => console.error(error))
    })
    app.listen(process.env.DB_STRING || PORT, function() {
        console.log(`Server is running on port ${PORT}`)
    })

