const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'to-do'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
    .then(data => {
        res.render('index.ejs', { task: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTask', (req, res) => {
    db.collection('tasks').insertOne({header: req.body.taskHeader, 
    context: req.body.task, isCompleted: false})
    .then(result => {
        console.log('Task Added')
        res.redirect('/')
    })
})

app.put('/switchTaskStatus', (req, res) => {
    db.collection('tasks').updateOne({header: req.body.headerS},{
        $set: {
            isCompleted: req.body.isCompleted == 'true' ? false : true
        }
    },{
        upsert: true
    })
    .then(result => {
        console.log('Task Completed')
        res.json('Task Completed')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTask', (req, res) => {
    db.collection('tasks').deleteOne({header: req.body.headerS})
    .then(result => {
        console.log('Rapper Deleted')
        res.json('Rapper Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

