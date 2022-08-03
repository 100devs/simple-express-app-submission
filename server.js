//Declare variables
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8500;
const mongoose = require('mongoose');
require('dotenv').config();
const TodoTask = require('./models/todotask')

//Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION,
    {useNewURLParser: true},
    () => {console.log('Connected to database')}
)

//GET METHOD
app.get('/', async (req,res) => {
    try{
        TodoTask.find({}, (err, tasks) => {
          res.render('index.ejs', {
            todoTasks: tasks
          })
        })
    } catch (err){
        if (err) return res.status(500).send(err)
    }
})

//POST
app.post('/', async (req,res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try{
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    }catch(err){
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//UPDATE 
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id 
                })
            })
        })
    .post((req,res) => {
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id,
            {
                title:req.body.title,
                content: req.body.content
            },
           err => {
            if(err) return res.status(500).send(err)
            res.redirect('/')
           } 
        )
    })    
 
//DELETE
app 
    .route('/remove/:id')
    .get((req,res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id,err =>{
            if(err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

//set localhost on PORT
app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))