// Declare Variables
const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
require('dotenv').config()
const TodoList = require('./models/todolist')

// Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true },
    () => { console.log('Connected to db!') })
    

// Get Method
app.get('/', async (req, res) => {
    try {
        TodoList.find({}, (err, tasks) => {
            res.render('index.ejs', { todoTasks: tasks })
        })
    } catch (err) {     
        if (err) return res.status(500).send(err)
    }
})

// Post Method
app.post('/', async (req, res) => {
    const todoList = new TodoList (
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try {
        await todoList.save()
        console.log(todoList)
        res.redirect('/')
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

// Edit or Update method
app 
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoList.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks: tasks, idTask: id
            })
        })
    })
    .post((req, res) => {
        const id = req.params.id
        TodoList.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if(err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

// Delete
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoList.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

