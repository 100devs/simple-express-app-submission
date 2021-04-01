const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 5000
require('dotenv').config()



let db,
dbConnectStr = process.env.DB_STRING,
dbName = 'ToDo'
// console.log(dbConnectStr);
MongoClient.connect(dbConnectStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection(dbName).find().sort({ likes: -1 }).toArray()
    .then(data => {
        console.log(req.path);
        res.render('index.ejs', { info: data })
    }).catch(error => console.error(error))
})

app.post('/addTask', (req, res) => {
    db.collection(dbName).insertOne({taskName: req.body.taskName,
    taskDetail: req.body.taskDetail, likes: 0})
    .then(result => {
        console.log('Task Added!');
        res.redirect('/')
    })
    .catch(error => console.error(error))
})


app.put('/addOneLike', (req, res) => {
    db.collection(dbName).updateOne({ 
        taskName: req.body.taskName,
        taskDetail: req.body.taskDetail,
        likes: req.body.likes},{
    $set: {
        likes:req.body.likes + 1
            }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like');
        res.json('Like Added')
    })
    .catch(error => console.error(error))
    })


app.delete('/deleteTask', (req, res) => {
    db.collection(dbName).deleteOne({ taskName: req.body.taskName})
    .then(result => {
        console.log('Task Deleted');
        res.json('Task Deleted res')
    })
    .catch(error => {
        console.error(error)
        // console.log(req);
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
})