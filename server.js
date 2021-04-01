const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'todo';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API GET METHOD
app.get('/', (req, res) => {
  db.collection('todoItems')
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      res.render('index.ejs', { info: data });
    })
    .catch((err) => console.error(err));
});

// API POST METHOD
app.post('/addTodo', (req, res) => {
  db.collection('todoItems')
    .insertOne({
      itemTitle: req.body.itemTitle,
      itemMessage: req.body.itemMessage,
      itemLike: 0,
    })
    .then((result) => {
      console.log('Todo Added');
      res.redirect('/');
    })
    .catch((err) => console.error(err));
});

// API DELETE METHOD
app.delete('/deleteTodoItem', (req, res) => {
  db.collection('todoItems')
    .deleteOne({ itemTitle: req.body.itemTitle })
    .then((result) => {
      console.log('Todo Deleted');
      res.json('Todo Deleted');
    });
});

// API PUT METHOD
app.put('/changeLike', (req, res) => {
  db.collection('todoItems')
    .updateOne(
      {
        itemTitle: req.body.itemTitle,
        itemMessage: req.body.itemMessage,
        itemLike: req.body.itemLike,
      },
      {
        $set: {
          itemLike: req.body.itemLike + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true
      }
    )
    .then((result) => {
      console.log('Added one like');
      res.json('Added one like');
    })
    .catch((err) => console.log(err));
});

// API LISTEN
app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
