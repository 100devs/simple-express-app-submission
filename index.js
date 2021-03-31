const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = 3000;

//models
const TodoTask = require("./models/TodoTask");

dotenv.config();

//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(process.env.PORT || 3000);
});



app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render('todo.ejs', { todoTasks: tasks });
    });
});

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});


// updateOne
app
.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id});
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


// Delete
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if(err) return res.send(500, err);
        res.redirect("/");
    });
});


