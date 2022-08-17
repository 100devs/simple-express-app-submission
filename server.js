const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'pomo-todo'

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
    db.collection('todos').find().sort({pomosCompleted: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({todo: request.body.todo,
    pomoSessions: request.body.pomoSessions, pomosCompleted: 0})
    .then(result => {
        console.log('to-do task added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addCompletedPomo', (request, response) => {
    db.collection('todos').updateOne({todo: request.body.todoS, pomoSessions: request.body.pomoSessionsS, pomosCompleted: request.body.pomosS},{
        $set: {
            pomosCompleted:request.body.pomosS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Completed Pomodoro Session')
        response.json('Pomodoro Session Completed')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteTodo', (request, response) => {
    db.collection('todos').deleteOne({todo: request.body.todoS})
    .then(result => {
        console.log('Task deleted')
        response.json('Task deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})