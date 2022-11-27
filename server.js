const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

const Months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getUTCFullYear();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'daylight';

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

app.get('/', (request, response) => {
  db.collection('tasks')
    .find()
    .toArray()
    .then((data) => {
      response.render('index.ejs', { info: data });
    })
    .catch((error) => console.error(error));
});

app.post('/addPriority', (request, response) => {
  db.collection('tasks')
    .insertOne({
      title: request.body.title,
      body: request.body.body,
      date: `${Months[month]} ${day} ${year}`,
    })
    .then((result) => {
      console.log('Priority Added');
      response.redirect('/');
    })
    .catch((error) => console.error(error));
});

app.put('/updatePriority', (request, response) => {
  db.collection('tasks')
    .updateOne(
      {
        title: request.body.title,
        body: request.body.body,
        date: request.body.date,
      },
      {
        $set: {
          date: `(Last Edited) ${Months[month]} ${day} ${year}`,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log('Updated');
      response.json('Updated priority');
    })
    .catch((error) => console.error(error));
});

app.delete('/deletePriority', (request, response) => {
  db.collection('tasks')
    .deleteOne({ title: request.body.title })
    .then((result) => {
      console.log('Priority Deleted');
      response.json('Priority Deleted');
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
