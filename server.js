const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo-application'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))        
    

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('items').find().sort({date: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('items').insertOne({todo_item: request.body.todo_item, date_item: request.body.todo_date, todo_checked: false})
    .then(result => {
        console.log('To do added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTodo', (request, response) => {
    db.collection('items').deleteOne({todo_item: request.body.todo_item})
    .then(result => {
        console.log('Item Deleted')
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))
})

app.put('/markCompleted', (request, response) => {
    console.log(request.body.todo_checked)
    console.log(!request.body.todo_checked)
    db.collection('items').updateOne({todo_item: request.body.todo_item, date_item: request.body.item_date, todo_checked: request.body.todo_checked},{
        $set: {
            todo_checked: !request.body.todo_checked
          }
    },{
        sort: {_id: -1},
        //upsert: true
    })
    .then(result => {
        console.log('Marked as completed')
        response.json('Marked as completed')
    })
    .catch(error => console.error(error))

})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})