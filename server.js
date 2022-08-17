//Declare variables and required modules
const express = require("express");
const app = express();
let PORT = 3005;
const mongoose = require("mongoose");
const TodoTask = require("./models/todotask");
require('dotenv').config()

//Set Middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//Connect to Mongo
mongoose.connect(process.env.MONGO_URI, 
    { useNewUrlParser: true }, 
    () => {console.log("Connected to db!");}
)

// GET METHOD
//this is what I tried based on come info I found online and while the error message is gone the page never loads and is stuck on "site can't be reached" in the browser
app.get("/", function (req, res) {
    TodoTask.find({}, function(err, tasks){
        if(!err){
            res.render("index.ejs", { todoTasks: tasks})
        }else{
            throw err;
        }
    }).clone().catch(function(err){console.log(err)})
});

//POST
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        title: req.body.title,
        content: req.body.content
    })
    try{
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    }catch(err){
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//EDIT
app
//first routing to the page with the params of id
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        //find the list of all tasks and the specific task to be edited
        TodoTask.find({}, (err, tasks) => {
            //first render the ejs page
            //and pass in the tasks and
            //seperately the spefic task
            //to load into the text box
            res.render('edit.ejs', {
                todoTasks: tasks, idTask: id
            })
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
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })


//REMOVE
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if(err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on port ${PORT}.`)
    })