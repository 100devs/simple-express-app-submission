//VARIABLES
const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
require("dotenv").config();
const TodoTask = require('./models/todotask');


//MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));  //allows the server to pass arrays and objects

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')}
);

//GET
app.get('/', async (req, res) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {
                todoTasks: tasks
            });
        })


    } catch (err) {
        if (err) return res.status(500).send({message: err.message})
    }
})

//POST
app.post('/', async (req,res) => {
    const todoTask = new TodoTask (
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try {
        await todoTask.save();
        console.log(todoTask);
        res.redirect("/");
    } catch (err) {
       if (err) return res.status(500).send(err);
       res.redirect("/");
    }

})

//EDIT OR UPDATE METHOD
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks: tasks, idTask: id })
            })
        })
    .post((req,res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate (
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/")
            }
        )
    })

//DELETE
app
    .route("/remove/:id")
    .get((req,res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err);
            res.redirect('/')
        })
    })


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})