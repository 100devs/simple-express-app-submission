// npm init
// npm install express mongoose ejs dotenv cors
// npm install nodemon --save-dev

//Declare variables
const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 8500;
const mongoose = require("mongoose");
require('dotenv').config();
const TodoTask = require('./models/todotask')

//Set middleware
app.set("view engine", "ejs");
app.use(express.static('public')); //for static (styles) we are using the public folder
app.use(express.urlencoded({extended: true}));5

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to database!')}
    );

//GET OR READ METHOD
app.get('/', async (req, res) => {
    // try{
    //     TodoTask.find({}, (err, tasks) => {
    //         res.render('index.ejs', {todoTasks: tasks})
    //     })
    // }catch (err) {
    //     if (err) return res.status(500).send(err);
    // }
    try{
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {
                todoTasks: tasks})
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//POST OR CREATE METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try{
        await todoTask.save()
        console.log(todoTask) //if it writes to the db successfully, we see this console log in the Terminal with the timestamp and id logged
        res.redirect("/")
    }
    catch(err){
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})


//EDIT OR UPDATE METHOD
app .route("/edit/:id") //this is called chaining methods
    .get((req, res) =>{
        const id = req.params.id;
        TodoTask.find({}, (err,tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id
            })
        })
    })
    .post((req,res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if (err) return res.status(500).send(err);
                res.redirect('/');
            }
        )
    })


//DELETE
app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if(err) return res.status(500).send(err)
            res.redirect("/")
        })
    })


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

