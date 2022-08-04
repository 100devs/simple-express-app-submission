const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('express/lib/response');
const { ObjectId } = require('mongodb');
const { NONAME } = require('dns');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv")
const port = process.env.PORT || 5000;

dotenv.config()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

app.get('/', function (req, res) {
  res.sendFile('newindex.html', { root: __dirname + "/public" });
});

//Connect to DB
MongoClient.connect(process.env.CONNECTIONSTR, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('FruityDoro');
    const userDataCollection = db.collection('UserData');

    //ROUTES
    // app.get('/', (req, res) => {
    //   // res.sendFile(path.join(__dirname, '/newindex.html'));
    //   res.redirect('/index');
    // });

    //LOGIN
    app.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, '/public/login.html'));
    });

    app.post('/login', (req, res) => {
      // console.log(req.body);
      if (req.body.username != "" && req.body.password != "") {
        userDataCollection.find({ username: req.body.username })
          .then(result => {
            console.log(result);
            if (result.length == 0) {
              console.log('invalid username or password');

            } else {
              res.sendFile(path.join(__dirname, '/public/newindex.html'));
            }
          })
          .catch(err => console.log(err));
      } else {
        res.sendStatus(400);
      }
    });

    //SIGNUP
    app.post('/signup', (req, res) => {
      userDataCollection.find({ username: req.body.username }).toArray()
        .then(result => {
          if (result.length > 1) {
            console.log('Name already taken, try again.');
          } else {
            userDataCollection.insertOne({ username: req.body.username, password: req.body.password }).catch(err => console.log(err));
            res.sendFile(path.join(__dirname, '/public/newindex.html'));
          }
        })
    });

    //INDEX
    app.get('/index', (req, res) => {
      res.sendFile(path.join(__dirname, '/public/newindex.html'));
    });

    //TASKS
    app.get('/tasks', (req, res) => {
      userDataCollection.find().toArray()
        .then(result => {
          res.json(result);
        })
        .catch(error => console.error(error))
    });

    app.get('/tasks/:id', (req, res) => {
      // console.log(req.params.id);
      userDataCollection.findOne({ _id: ObjectId(req.params.id) })
        .then(result => {
          res.json(result);
        })
        .catch(error => console.error(error))
    });

    app.post('/tasks', (req, res) => {
      userDataCollection.insertOne(
        { detail: req.body.detail }
      )
        .then(result => {
          res.json('Success');
        })
        .catch(error => console.error(error))
    });

    app.delete('/tasks/:id', (req, res) => {
      userDataCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('Nothing to delete')
          }
          res.json(`Deleted ${req.params.id}`)
        })
        .catch(error => console.error(error))
    });



  })
  .catch(err => console.log(err));

