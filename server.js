const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const uuid = require("uuid")
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'ourlist'

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
    db.collection('todo').find().sort({deadline: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addToDo', (request, response) => {
    let idGen = uuid.v4()
    db.collection('todo').insertOne({class: 'todo', id: idGen, taskBody: request.body.taskBody,
    deadline: request.body.deadline, category: request.body.category, gc: request.body.gc})
    .then(result => {
        console.log('Item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.post('/addMessage', (request, response) => {
    let idGen = uuid.v4()
    db.collection('todo').insertOne({class: 'message', id: idGen, messageBody: request.body.messageBody, timeSent: new Date()})
    .then(result => {
        console.log('Message Sent')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// app.put('/addOneLike', (request, response) => {
//     db.collection('todo').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{
//         $set: {
//             likes:request.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })

app.delete('/deleteTask', (request, response) => {
    // taskBody: request.body.taskBodyS
    db.collection('todo').deleteOne({id: request.body.elementids})
    .then(result => {
        // console.log(request)
        console.log('Item Deleted')
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})