const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 13208
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

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
    db.collection('my_todo_list').find().sort({date: -1}).toArray()     //for sort() by descending = -1, ascending = 1
    .then(data => {
        response.render('index.ejs', { info: data })    //info is the name of the data 
    })
    .catch(error => console.error(error))
})

app.post('/addtodo', (request, response) => {
    db.collection('my_todo_list').insertOne({task: request.body.task,
    content: request.body.content, date: new Date().toDateString(), completed: false})
    .then(result => {
        console.log('Todo item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/taskCompleted', (request, response) => {
    db.collection('my_todo_list').updateOne({task: request.body.task, date: request.body.date},{
        $set: {
            completed: true
          }
    },{
        sort: {completed: -1},
        upsert: false
    })
    .then(result => {
        console.log('Task completed')
        response.json('Task completed')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteTask', (request, response) => {
    db.collection('my_todo_list').deleteOne({task: request.body.task})
    .then(result => {
        console.log('Todo task Deleted')
        response.json('Todo task Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})