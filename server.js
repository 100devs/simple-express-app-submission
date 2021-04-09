const express = require("express");

const app = express();

const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 3000
require('dotenv').config()

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "todo";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`We've connected to ${dbName} database`);
    db = client.db(dbName);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const todoItems = await db.collection("todos").find().toArray()
  const itemsLeft = await db.collection('todos').countDocuments(
    {completed: false})
    res.render("index.ejs", { zebra: todoItems, left: itemsLeft});
})


app.post("/createTodo", (req, res) => {
  console.log(req.body.rainbowUnicorn)
  db.collection("todos")
    .insertOne({
      todo: req.body.todoItem.trim(),
      completed: false,
    })
    .then((result) => {
      console.log("todo has been added!");
      res.redirect("/");
    });
});

app.put('/markComplete', (req, res) => {

  db.collection('todos').updateOne({todo: req.body.rainbowUnicorn}, {
    $set: {
      completed: true
    }
  })
  .then( result => {
    console.log('Marked Complete')
    res.json('Marked Complete')
  })
})

app.put('/undo', (req, res) => {

  db.collection('todos').updateOne({todo: req.body.rainbowUnicorn}, {
    $set: {
      completed: false
    }
  })
  .then( result => {
    console.log('Marked Complete')
    res.json('Marked Complete')
  })
})



app.delete('/deleteTodo', (req, res)=>{
db.collection('todos').deleteOne({todo: req.body.rainbowUnicorn})
    .then(result =>{
      console.log("deleted todo")
      res.json("Deleted it")
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log("Server is running!");
});
