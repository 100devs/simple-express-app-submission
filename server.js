//Declare variables
const express = require("express");
const req = require("express/lib/request");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const TodoTask = require('./models/todotask');
require('dotenv').config()

//Set middleware
app.set('view engine', 'ejs') //template for html
app.use(express.static('public'))
app.use(express.urlencoded({extended: true})); //parses urls 

//Connect to Mongo
mongoose.connect(
    process.env.DB_STRING, 
    { useNewUrlParser: true }, 
    () => {console.log("Connected to db!");}
)

// GET METHOD
app.get("/", async (req, res) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            res.render("index.ejs", { todoTasks: tasks });
        });
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});


//POST METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        });
    try {
        await todoTask.save();
        console.log(todoTask)
        res.redirect("/");
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    }
});


//Edit or Update Method
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("edit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },

            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            });
    });

//Delete
app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})