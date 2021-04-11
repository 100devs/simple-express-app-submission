const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo' 

MongoClient.connect( dbConnectionStr, {useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    }) 

    .catch(err =>{
        console.log(err)
    })

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    

    app.get('/', async (request, response)=>{
        const todoItems = await db.collection('todo').find().toArray()
        const itemsLeft = await db.collection('todo').countDocuments({completed: false})
        response.render('index.ejs', {info: todoItems, left: itemsLeft})
    })

    app.post('/addItem', (request, response) => {
        db.collection('todo').insertOne({taskName: request.body.taskName, completed:false}) // creating a document that has a taskitem and completed property that will always be false
        .then(result => {
            console.log('Item Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/markComplete', (request, response) => {
        db.collection('todo').updateOne({taskName: request.body.taskName},{
            $set: { // setting completed properties to true 
               completed: true
              }
        
        })
        .then(result => {
            console.log('Marked Complete')
            response.json('Marked Complete')
        })
        .catch(error => console.error(error))
    })

    app.put('/undo', (request, response) => {
        db.collection('todo').updateOne({taskName: request.body.taskName},{
            $set: { // setting completed properties to true 
               completed: false
              }
        
        })
        .then(result => {
            console.log('Marked Complete')
            response.json('Marked Complete')
        })
        .catch(error => console.error(error))
    })


    app.delete('/deleteText', (request, response) => {
        db.collection('todo').deleteOne({taskName: request.body.taskName}) // finding collection ... deleting the property name that I want to delete
        .then(result => {
            console.log('Item Deleted')
            response.json('Item Deleted')
        })
        .catch(error => console.error(error))
    
    })

    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on port ${PORT}!`)
      }) 
