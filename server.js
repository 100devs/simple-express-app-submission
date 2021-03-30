const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
const uri = process.env.MONGODB_URI;

let db,
    dbConnectionStr = 'mongodb+srv://demo:demo@cluster0.izpkp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName = 'todoList'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/' , (request, response) => {
    db.collection('chores').find().toArray()
        .then(data => {
            response.render('index.ejs', {info : data})
        })
        .catch(error => console.log(error))
})

app.post('/addItem', (request, response) => {
    db.collection('chores').insertOne(request.body)
        .then(result => {
            console.log('Added Item')
            response.redirect('/')
        })
        .catch(error => {
            console.log(error)
        })
})

app.delete('/deleteItem', (request,response) => {
    db.collection('chores').deleteOne({todo : request.body.todoX})
        .then(result => {
            console.log('Deleted Item')
            response.json('Deleted Item')
        })
        .catch(error => console.log(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})