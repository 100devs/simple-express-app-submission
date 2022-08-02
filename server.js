const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

let dbConnectStr = process.env.DB_STRING

mongo.connect(dbConnectStr, (err, client) => {

    if (err) console.log(err)
    else console.log('db connection success')

    const db = client.db('Cluster0')
    const tasksCollection = db.collection('tasks')

    app.get('/', async (req, res) => {
        const tasks = await tasksCollection.find().toArray()
        res.render('main.ejs', {info : tasks})
    })

    app.post('/add', (req, res) => {
        console.log(req.body.task)
        tasksCollection.insertOne({task: req.body.task})
        res.redirect('/')
    })

    app.put('/editTask', async (req, res) => {
        await tasksCollection.updateOne({task: req.body.task},{
            $set: {
                task:req.body.newTask
              }
        },{
            sort: {_id: -1},
            upsert: true
        })
        res.json('edited task')
    })

    app.delete('/delete', async (req, res) => {
        await tasksCollection.deleteOne({task: req.body.task})
        res.json('deleted task')
    })

    app.delete('/deleteAll', async (req, res) => {
        await tasksCollection.deleteMany()
        res.json('deleted all')
    })

    app.listen(port, ()=>{
        console.log('server launch success')
    })
})