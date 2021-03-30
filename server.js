const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

let db,
    dbConnectionStr = SERVERURLHERE,
    dbName = 'tasks'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTask', (req, res) => {
    db.collection('tasks').insertOne(req.body)
    .then(result => {
        console.log('Task Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTask', (req, res) => {
    db.collection('tasks').deleteOne({taskName: req.body.taskNameS})
    .then(result => {
        console.log('Task Deleted')
        res.json('Task Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
