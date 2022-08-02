//Declare application variables
const express = require('express')
const { request } = require('http')
const app = express()
const PORT = 8500
const mongoose = require('mongoose')
//model variable
const ToDoTask = require('./models/toDoTask')
require('dotenv').config()

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect((process.env.DBSTRING || DBSTRING), 
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')}
)

//GET route
app.get('/', async (req, res) => {
    try{
        ToDoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {toDoList: tasks})
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

//POST route
app.post('/', async (req, res) => {
    const todoTask = new ToDoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    }
    catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//PUT route (UPDATE)
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        ToDoTask.find({}, (err, tasks) =>
            res.render('edit.ejs', {toDoList: tasks, idTask: id}))
    })
    .post((req, res) => {
        const id = req.params.id
        ToDoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content,
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
})

//DELETE route
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        ToDoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})