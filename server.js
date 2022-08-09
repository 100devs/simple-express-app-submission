//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon

//"start": "nodemon server.js"


//Declare variables
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const TodoTask = require('./models/todotask')
require('dotenv').config()

const dbConnectionString = process.env.DB_STRING

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json()) //optional
app.use(cors())

// Connection to Mongo database
mongoose.connect(
    dbConnectionString,
    {useNewUrlParser:true},
    () => {console.log('Connected to db!')}
    )
    
// GET METHOD
// Sends out ejs/index.html file
app.get("/", async (req, res) => {
    try {
        TodoTask.find({},(err,task)=>{
            res.render('index.ejs', {
                todoTasks:task
            }) 
        })
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});


//POST
app.post('/', async (req,res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        })
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    } catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})


//EDIT or UPDATE METHOD
app
    .route("/edit/:id")
    .get((req,res) => {
        const id = req.params.id
        TodoTask.find({}, (err,tasks)=>{
            res.render('edit.ejs',{ todoTasks:tasks, idTask: id })
        })
    })
    .post((req,res)=>{
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
    .route("/remove/:id")
    .get((req,res)=>{
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
             if (err) return res.status(500).send(err)
             res.redirect('/')
        })
    })
 
 
    
// Listening for Port
// PORT = 9000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
