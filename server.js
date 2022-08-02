//Declare variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
PORT = process.env.PORT
const TodoTask = require('./models/todotask')//require the model variable from the models/todotask.js file we're exporting

//Middleware 
app.set('view engine', 'ejs')
app.use(express.static('public')) //tells express to use styling sheets
app.use(express.urlencoded({extended: true}))


mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true },
    () => {console.log('Connected to DB!')})
//GET
app.get('/', async (req, res) => {
    try{
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {todoTasks: tasks})
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})
//POST
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content:req.body.content
        }
    )
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    } catch (err) {
       if (err) return res.status(500).send(err)
       res.redirect('/')
    }
})
//EDIT OR UPDATE METHOD
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err,tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id})
            })
    })
    .post((req, res) => {//post instead of put because forms DONOT support put requests. Elimates having to write clientside js.
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

//DELETE
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => { //remove instead of delete to avoid writing client side js (ie. fetch methods)
            if (err) return res.status(500).send(err)
            res.redirect('/')
         })
    })
app.listen(process.env.PORT || PORT, () => console.log(`Server is running!`))