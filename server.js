//Declare requirement variables 
const express = require('express')
const app = express()
const PORT = 8500;
const mongoose = require('mongoose');
const todotask = require('./models/todotask');
const TodoTask = require('./models/todotask')
const uri = process.env.MONGODB_URI;
require('dotenv').config()

//Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

//connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },   
).then(() => {console.log('Connected to db!');})
.catch(err => {
    console.log(
        "Error in DB connection : " + JSON.stringify(err, undefined, 2)
      );
})

//GET method
app.get('/', async (req,res) => {
    try{
        TodoTask.find({}, (err, tasks) => {
            res.render("index.ejs", {
                todoTasks: tasks
            })
        })
    } catch (err) {
        if(err) return res.status(500).send(err)
    }
})

//POST route for button
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }    
    )
    try {
            await todoTask.save()
            console.log(todoTask)
            res.redirect('/')
        } catch(err) {
            if(err) return res.status(500).send(err)
            res.redirect('/')
        }
})

//UPDATE route for edit icon
app
    .route("/edit/:id")
    .get((req,res) => {
        const id = req.params.id
        TodoTask.find({}, (err,tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id })
            })
        })
    .post((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id, 
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if(err) return ers.status(500).send(err)
                res.redirect('/')
            }
        )
    })
    




//DELETE route for delete icon
app
    .route("/remove/:id")
    .get((req,res) =>{
        const id= req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })



//Set up listener
app.listen(uri || PORT, () => console.log(`Server is running on port ${PORT}`))
//still borken?

