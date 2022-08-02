const { render } = require('ejs')
const { response } = require('express')
const express = require('express')
const { ConnectionClosedEvent } = require('mongodb')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()



const PORT = 3001
let dbConnectionString = process.env.DATABASE
let dbName = 'tasks'
let db

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName) 

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        app.get('/', (req, res) => {
            db.collection('tasks').find().sort({ _id: 1 }).toArray()
                .then(data => {
                    res.render('index.ejs', { info: data })
                })
                .catch(error => console.error(error))
        })

        app.post('/addTask', (req, res) => {
            db.collection('tasks').insertOne({ taskName: req.body.taskName, taskDescription: req.body.taskDescription, taskDate: new Date(), startScale: req.body.startScale, isComplete: false, isSubTask: req.body.subTask, taskId: req.body._id })
                .then(result => {
                    console.log('Task added')
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/completeTask', (req, res) => {
            db.collection('tasks').updateOne({ taskName: req.body.taskName, }, {
                $set: {
                    isComplete: true,
                }
            }, {
                upsert: false,
            })
                .then(result => {
                    console.log('Task complete')
                    res.json('Task marked complete')
                })
                .catch(error => console.error(error))
        })

        app.put('/editTask', (req, res) => {
            db.collection('tasks').updateOne({ taskName: req.body.currentTaskName, }, {
                $set: {
                    taskName: req.body.newTaskName,
                    taskDescription: req.body.newTaskDescription,
                    isComplete: false
                }
            }, {
                upsert: false
            })
                .then(result => {
                    console.log('Task edit complete')
                    res.json('Task edited')
                })
                .catch(error => console.error(error))
        })

        app.delete('/deleteTask', (req, res) => {
            db.collection('tasks').deleteOne({ taskName: req.body.taskName })
                .then(result => {
                    console.log('Task deleted')
                    res.json('Task has been deleted')
                })
                .catch(err => console.error(err))
        })

    })
    .catch(error => console.error(error))

// This needs updated with the .env
app.listen(process.env.PORT || PORT)
console.log(`Server running on port ${PORT}`)
