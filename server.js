// server.js
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config();

const connectionString = process.env.DB_STRING;

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to Database`);
    const db = client.db('rock-bands');
    const dbName = db.collection('info');

    // body-parser before CRUD handlers
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true })); //replaced body-parser
    app.use(express.json());
    app.use(express.static('public'));

    // CRUD handlers below this line
    app.get('/', (request, response) => {
      dbName
        .find()
        .toArray()
        .then((data) => {
          response.render('index.ejs', { info: data });
        })
        .catch((error) => console.error(error));
    });

    // handles client-side POST request from the form
    app.post('/info', (request, response) => {
      dbName
        .insertOne(request.body)
        .then((result) => {
          console.log(`New band info added`);
          response.redirect('/');
        })
        .catch((error) => console.error(error));
    });

    app.put('/info', (request, response) => {
      dbName
        .findOneAndUpdate(
          { name: 'The Beatles' },
          {
            $set: {
              name: request.body.name,
              year: request.body.year,
              location: request.body.location,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          response.json('Success');
        })
        .catch((error) => console.error(error));
    });

    app.delete('/info', (request, response) => {
      dbName
        .deleteOne({ name: request.body.name })
        .then((results) => {
          if (results.deletedCount === 0) {
            return response.json(`No info to delete`);
          }
          response.json(`Deleted The Killers info`);
        })
        .catch((error) => console.error(error));
    });

    app.listen(process.env.PORT || PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  }
);
